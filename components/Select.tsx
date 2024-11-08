import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { styled } from "tamagui";

interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectProps<T> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}

const SelectContainer = styled(TouchableOpacity, {
  backgroundColor: "$gray2",
  borderRadius: 8,
  padding: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const SelectText = styled(Text, {
  color: "$gray12",
  fontSize: 16,
});

export function Select<T extends string>({
  value,
  options,
  onChange,
}: SelectProps<T>) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <SelectContainer
      onPress={() => {
        // Here you would typically show a modal or picker
        // For now, we'll just cycle through options
        const currentIndex = options.findIndex(
          (option) => option.value === value,
        );
        const nextIndex = (currentIndex + 1) % options.length;
        onChange(options[nextIndex].value);
      }}
    >
      <SelectText>{selectedOption?.label || ""}</SelectText>
      <Ionicons name="chevron-down" size={20} color="$gray11" />
    </SelectContainer>
  );
}
