import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable } from "react-native";
import { View, Text, styled, XStack } from "tamagui";

import { Name } from "../models/types";
import { useNameStore } from "../store/nameStore";

import { BACKGROUND_COLORS, BACKGROUND_IMAGES } from "@/constants/constants";

interface FavoriteNameCardProps {
  name: Name;
}

const Card = styled(View, {
  borderRadius: 12,
  padding: "$4",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});

const NameText = styled(Text, {
  fontSize: 20,
  color: "$gray12",
  marginBottom: 8,
});

const DetailText = styled(Text, {
  fontSize: 14,
  color: "$gray11",
  marginBottom: 4,
});

function FavoriteNameCard({ name }: FavoriteNameCardProps) {
  const updateRating = useNameStore((state) => state.updateRating);

  const handleRatingPress = (rating: number) => {
    updateRating(name.id, rating);
  };

  return (
    <Card
      backgroundColor={
        BACKGROUND_COLORS[name.gender as keyof typeof BACKGROUND_COLORS]
      }
    >
      <XStack justifyContent="space-between">
        <XStack alignItems="center" gap="$2">
          <Image
            source={
              BACKGROUND_IMAGES[name.gender as keyof typeof BACKGROUND_IMAGES]
            }
            style={{ width: 50, height: 50, borderRadius: 10 }}
            contentFit="contain"
            cachePolicy="disk"
          />
          <NameText>{name.name}</NameText>
        </XStack>
        <XStack justifyContent="space-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <Pressable key={index} onPress={() => handleRatingPress(index + 1)}>
              <Ionicons
                name={index < (name.rating || 0) ? "star" : "star-outline"}
                size={20}
                color={index < (name.rating || 0) ? "#ff9100" : "#C0C0C0"}
              />
            </Pressable>
          ))}
        </XStack>
      </XStack>

      <XStack justifyContent="space-between">
        <DetailText>Origin: {name.origin}</DetailText>
        <DetailText>Religion: {name.religion}</DetailText>
      </XStack>

      {name.meaning && <DetailText>Meaning: {name.meaning}</DetailText>}
    </Card>
  );
}

export default memo(FavoriteNameCard);
