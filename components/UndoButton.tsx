import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { styled } from "tamagui";

import { colors, pressAnimationStyle } from "../styles/preset-styles";

interface UndoButtonProps {
  onUndo: () => void;
}

const Button = styled(TouchableOpacity, {
  position: "absolute",
  bottom: 20,
  backgroundColor: colors.secondary,
  borderRadius: 30,
  width: 60,
  height: 60,
  justifyContent: "center",
  alignItems: "center",
  ...pressAnimationStyle,
});

export function UndoButton({ onUndo }: UndoButtonProps) {
  return (
    <Button onPress={onUndo} activeOpacity={0.7}>
      <Ionicons name="arrow-undo" size={30} color="white" />
    </Button>
  );
}
