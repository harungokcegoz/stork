import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { Text, View, YStack, XStack } from "tamagui";

import boyBg from "../assets/images/card-bg/boy.png";
import girlBg from "../assets/images/card-bg/girl.png";
import { Name, SwipeDirection } from "../models/types";

import { colors } from "@/styles/preset-styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const MAX_ROTATION = 15;

interface CardStackProps {
  name: Name;
  onSwipe: (direction: SwipeDirection) => void;
  index: number;
  totalCards: number;
  onUndo: () => void;
}

export function CardStack({
  name,
  onSwipe,
  index,
  totalCards,
  onUndo,
}: CardStackProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const BACKGROUND_IMAGES = {
    male: boyBg,
    female: girlBg,
  } as const;

  const BACKGROUND_COLORS = {
    male: "#bde0fe",
    female: "#ffc8dd",
    unisex: "$gray3",
  } as const;

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SCREEN_WIDTH / 4], [0, 1]),
    transform: [{ rotate: "30deg" }],
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SCREEN_WIDTH / 4, 0], [1, 0]),
    transform: [{ rotate: "-30deg" }],
  }));

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (index === 0) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (index === 0) {
        const swipeX = Math.abs(event.translationX);

        if (swipeX > SWIPE_THRESHOLD) {
          const direction = event.translationX > 0 ? "right" : "left";
          const destination =
            direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
          translateX.value = withSpring(destination, {
            velocity: event.velocityX,
          });
          runOnJS(onSwipe)(direction);
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    if (index === 0) {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          {
            rotate: `${interpolate(
              translateX.value,
              [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
              [-MAX_ROTATION, 0, MAX_ROTATION],
            )}deg`,
          },
        ],
        zIndex: totalCards,
      };
    }

    return {
      transform: [
        {
          scale: interpolate(index, [1, 2], [0.98, 0.96]),
        },
        {
          translateY: interpolate(index, [1, 2], [8, 16]),
        },
      ],
      zIndex: totalCards - index,
    };
  });

  const handleLike = () => onSwipe("right");
  const handleNope = () => onSwipe("left");

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={cardStyle}>
        <View
          backgroundColor={
            BACKGROUND_COLORS[name.gender as keyof typeof BACKGROUND_COLORS]
          }
          padding="$1"
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={20}
          width={SCREEN_WIDTH - 100}
          height={450}
          position="absolute"
          transform={[{ translateX: -((SCREEN_WIDTH - 100) / 2) }]}
          top={0}
          justifyContent="center"
        >
          <YStack padding="$5">
            <XStack
              justifyContent="space-between"
              alignItems="center"
              position="absolute"
              top={0}
              width="120%"
            >
              <Animated.View style={nopeOpacity}>
                <Text
                  color={colors.red}
                  padding="$3"
                  borderRadius="$2"
                  fontSize="$6"
                  fontWeight="bold"
                >
                  NOPE
                </Text>
              </Animated.View>

              <Image
                source={
                  BACKGROUND_IMAGES[
                    name.gender as keyof typeof BACKGROUND_IMAGES
                  ]
                }
                cachePolicy="memory"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 40,
                  position: "absolute",
                  right: 10,
                  top: 0,
                }}
              />

              <Animated.View style={likeOpacity}>
                <Text
                  color={colors.green}
                  padding="$3"
                  borderRadius="$2"
                  fontSize="$6"
                  fontWeight="bold"
                >
                  LIKE
                </Text>
              </Animated.View>
            </XStack>

            <YStack gap="$3">
              <Text
                fontSize="$8"
                fontWeight="bold"
                color={
                  name.gender === "unisex" ? colors.textBlack : colors.textWhite
                }
              >
                {name.name}
              </Text>

              <Text
                fontSize="$5"
                color={
                  name.gender === "unisex" ? colors.textBlack : colors.textWhite
                }
              >
                Origin: {name.origin}
              </Text>

              {name.religion && (
                <Text
                  fontSize="$5"
                  color={
                    name.gender === "unisex"
                      ? colors.textBlack
                      : colors.textWhite
                  }
                >
                  Religion: {name.religion}
                </Text>
              )}

              <Text
                fontSize="$5"
                color={
                  name.gender === "unisex" ? colors.textBlack : colors.textWhite
                }
              >
                Gender: {name.gender}
              </Text>

              {name.meaning && (
                <Text
                  fontSize="$5"
                  color={
                    name.gender === "unisex"
                      ? colors.textBlack
                      : colors.textWhite
                  }
                >
                  Meaning: {name.meaning}
                </Text>
              )}

              {name.pronunciation && (
                <Text
                  fontSize="$5"
                  color={
                    name.gender === "unisex"
                      ? colors.textBlack
                      : colors.textWhite
                  }
                >
                  Pronunciation: {name.pronunciation}
                </Text>
              )}

              {name.variants && name.variants.length > 0 && (
                <>
                  <Text
                    fontSize="$5"
                    color={
                      name.gender === "unisex"
                        ? colors.textBlack
                        : colors.textWhite
                    }
                  >
                    Variants:
                  </Text>
                  <XStack flexWrap="wrap" gap="$2">
                    {name.variants.map((variant) => (
                      <View
                        key={variant}
                        backgroundColor={
                          name.gender === "unisex"
                            ? colors.unselectedBackground
                            : "$gray1"
                        }
                        borderRadius="$3"
                        padding="$3"
                      >
                        <Text fontSize="$4">{variant}</Text>
                      </View>
                    ))}
                  </XStack>
                </>
              )}
            </YStack>
          </YStack>

          <XStack
            justifyContent="space-around"
            alignItems="center"
            padding="$3"
            paddingHorizontal="$5"
          >
            <View
              backgroundColor={colors.red}
              {...buttonStyle}
              width={50}
              height={50}
            >
              <Ionicons
                name="close"
                size={30}
                color="white"
                onPress={handleNope}
              />
            </View>

            <View
              backgroundColor={colors.secondary}
              {...buttonStyle}
              width={40}
              height={40}
            >
              <Ionicons
                name="arrow-undo"
                size={20}
                color="white"
                onPress={onUndo}
              />
            </View>

            <View
              backgroundColor={colors.green}
              {...buttonStyle}
              width={50}
              height={50}
            >
              <Ionicons
                name="heart"
                size={30}
                color="white"
                onPress={handleLike}
              />
            </View>
          </XStack>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const buttonStyle = {
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: colors.textBlack,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
} as const;
