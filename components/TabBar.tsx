import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Circle, View } from "tamagui";

import { colors, shadows } from "../styles/preset-styles";

const TAB_ROUTES = [
  { name: "homepage", icon: "home-outline" },
  { name: "stack", icon: "logo-stackoverflow" },
  { name: "favorites", icon: "heart-outline" },
  { name: "profile", icon: "person-outline" },
];

export function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = useMemo(
    () =>
      TAB_ROUTES.map((route) => ({
        ...route,
        isActive: pathname === `/${route.name}`,
      })),
    [pathname],
  );

  const handlePress = (routeName: string) => {
    router.push(`/${routeName}`);
  };

  return (
    <View
      position="absolute"
      bottom={30}
      left={20}
      right={20}
      backgroundColor="#ffffff"
      borderRadius={15}
      height={70}
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      paddingHorizontal={20}
      {...shadows}
    >
      {tabs.map(({ name, icon, isActive }) => (
        <TouchableOpacity
          key={name}
          onPress={() => handlePress(name)}
          activeOpacity={0.7}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 5,
          }}
        >
          <Ionicons
            name={icon}
            size={30}
            color={isActive ? colors.secondary : colors.textGray}
            style={{
              transform: [{ scale: isActive ? 1.1 : 1 }],
            }}
          />
          {isActive && <Circle size={5} backgroundColor={colors.secondary} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}
