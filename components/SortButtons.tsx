import { Ionicons } from "@expo/vector-icons";
import { Text, View, styled } from "tamagui";

import { colors } from "@/styles/preset-styles";

interface SortButtonsProps {
  sortBy: "name" | "rating" | null;
  onSortChange: (sort: "name" | "rating" | null) => void;
}

const ButtonContainer = styled(View, {
  flexDirection: "row",
  gap: 8,
  padding: "$4",
  justifyContent: "center",
});

const SortButton = styled(View, {
  minWidth: 100,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  paddingBottom: "$2",
  paddingTop: "$2",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.border,
  variants: {
    isActive: {
      true: {
        backgroundColor: colors.selectedBackground,
      },
      false: {
        backgroundColor: colors.background,
      },
    },
  },
});

const SortText = styled(Text, {
  color: colors.textBlack,
});

export function SortButtons({ sortBy, onSortChange }: SortButtonsProps) {
  return (
    <ButtonContainer>
      <SortButton
        isActive={sortBy === "name"}
        onPress={() => onSortChange(sortBy === "name" ? null : "name")}
      >
        <Ionicons
          name="arrow-down-outline"
          size={20}
          color={colors.textBlack}
        />
        <SortText>A-Z</SortText>
      </SortButton>

      <SortButton
        isActive={sortBy === "rating"}
        onPress={() => onSortChange(sortBy === "rating" ? null : "rating")}
      >
        <Ionicons name="star-outline" size={20} color={colors.textWhite} />
        <SortText>Rating</SortText>
      </SortButton>
    </ButtonContainer>
  );
}
