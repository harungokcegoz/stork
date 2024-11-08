import { FlatList, SafeAreaView } from "react-native";
import { H3, View } from "tamagui";

import { FavoriteNameCard } from "../components/FavoriteNameCard";
import { useNameStore } from "../store/nameStore";

import { colors } from "@/styles/preset-styles";

export default function FavoritesScreen() {
  const { favorites } = useNameStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View backgroundColor={colors.background} padding="$4" gap="$4" flex={1}>
        <H3>Favorites</H3>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FavoriteNameCard name={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
