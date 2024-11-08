import { View, Text } from "react-native";
import { styled } from "tamagui";

const Container = styled(View, {
  flex: 1,
  backgroundColor: "$background",
  padding: 16,
});

const Title = styled(Text, {
  fontSize: 24,
  color: "$gray12",
  marginBottom: 16,
});

export default function ProfileScreen() {
  return (
    <Container>
      <Title>Profile</Title>
      {/* Add other profile settings here */}
    </Container>
  );
}
