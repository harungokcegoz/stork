import { SafeAreaView } from "react-native";
import { Text, YStack } from "tamagui";

import { CardStack } from "@/components/CardStack";
import { colors } from "@/styles/preset-styles";
import { useNameViewModel } from "@/viewModels/NameViewModel";

export default function HomeScreen() {
  const { getVisibleNames, handleSwipe, handleUndo } = useNameViewModel();
  const visibleNames = getVisibleNames();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack
        flex={1}
        backgroundColor={colors.background}
        padding="$4"
        gap="$5"
      >
        <YStack gap="$1">
          <Text
            fontSize="$6"
            fontWeight="bold"
            color={colors.textBlack}
            marginBottom="$4"
            alignSelf="center"
          >
            Welcome to Stork
          </Text>

          <Text
            fontSize="$5"
            color={colors.textGray}
            textAlign="center"
            marginBottom="$6"
          >
            Find the perfect name for your baby by swiping through our curated
            collection
          </Text>
        </YStack>

        <YStack alignItems="center" justifyContent="center">
          {visibleNames.map((name, index) => (
            <CardStack
              key={name.id}
              name={name}
              onSwipe={handleSwipe}
              index={index}
              totalCards={visibleNames.length}
              onUndo={handleUndo}
            />
          ))}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
