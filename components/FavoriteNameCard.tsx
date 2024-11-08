import { Ionicons } from "@expo/vector-icons";
import { View, Text, styled } from "tamagui";

import { Name } from "../models/types";

interface FavoriteNameCardProps {
  name: Name;
}

const Card = styled(View, {
  backgroundColor: "$gray2",
  borderRadius: 12,
  padding: "$4",
  marginBottom: "$4",
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
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

const RatingContainer = styled(View, {
  flexDirection: "row",
  marginTop: 8,
});

export function FavoriteNameCard({ name }: FavoriteNameCardProps) {
  return (
    <Card>
      <NameText>{name.name}</NameText>
      <DetailText>Origin: {name.origin}</DetailText>
      <DetailText>Gender: {name.gender}</DetailText>
      {name.meaning && <DetailText>Meaning: {name.meaning}</DetailText>}
      <RatingContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <Ionicons
            key={index}
            name={index < (name.rating || 0) ? "star" : "star-outline"}
            size={20}
            color={index < (name.rating || 0) ? "#FFD700" : "#C0C0C0"}
          />
        ))}
      </RatingContainer>
    </Card>
  );
}
