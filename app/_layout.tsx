import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import { TabBar } from "../components/TabBar";
import config from "../tamagui.config";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="homepage" />
          <Stack.Screen name="stack" />
          <Stack.Screen name="favorites" />
          <Stack.Screen name="profile" />
        </Stack>
        <TabBar />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
