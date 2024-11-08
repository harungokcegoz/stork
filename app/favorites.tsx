import { useMemo, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { View, Text, styled, H3 } from "tamagui";
import { Gender } from "../models/types";
import { NameFilters } from "../components/NameFilters";
import FavoriteNameCard from "../components/FavoriteNameCard";
import { SortButtons } from "../components/SortButtons";
import { useNameStore } from "../store/nameStore";

const Container = styled(View, {
  flex: 1,
  padding: "$4",
  backgroundColor: "$background",
});

const EmptyText = styled(Text, {
  textAlign: "center",
  color: "$gray11",
  marginTop: 20,
});

export default function FavoritesScreen() {
  const favorites = useNameStore((state) => state.favorites);
  const [sortBy, setSortBy] = useState<"name" | "rating" | null>(null);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);

  const origins = useMemo(
    () => Array.from(new Set(favorites.map((name) => name.origin))).sort(),
    [favorites]
  );

  const religions = useMemo(
    () => Array.from(
      new Set(
        favorites.map((name) => name.religion).filter(Boolean) as string[],
      ),
    ).sort(),
    [favorites]
  );

  const filteredAndSortedFavorites = useMemo(() => {
    let filtered = favorites;

    if (selectedOrigins.length > 0) {
      filtered = filtered.filter((name) => selectedOrigins.includes(name.origin));
    }
    if (selectedReligions.length > 0) {
      filtered = filtered.filter((name) => name.religion && selectedReligions.includes(name.religion));
    }
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((name) => selectedGenders.includes(name.gender));
    }

    if (!sortBy) return filtered;

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      return ratingDiff === 0 ? a.name.localeCompare(b.name) : ratingDiff;
    });
  }, [favorites, sortBy, selectedOrigins, selectedReligions, selectedGenders]);

  const renderItem = ({ item: name }) => (
    <FavoriteNameCard name={name} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <H3>Favorites</H3>
        
        <NameFilters
          selectedOrigins={selectedOrigins}
          setSelectedOrigins={setSelectedOrigins}
          selectedReligions={selectedReligions}
          setSelectedReligions={setSelectedReligions}
          selectedGenders={selectedGenders}
          setSelectedGenders={setSelectedGenders}
          origins={origins}
          religions={religions}
        />

        <SortButtons sortBy={sortBy} onSortChange={setSortBy} />

        {filteredAndSortedFavorites.length > 0 ? (
          <FlatList
            data={filteredAndSortedFavorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
          />
        ) : (
          <EmptyText>No favorite names found</EmptyText>
        )}
      </Container>
    </SafeAreaView>
  );
}
