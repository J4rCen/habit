import customTamaguiConfig from "@/tamagui.config";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";



export default function RootLayout() {
  return (
    <SafeAreaProvider>
        <TamaguiProvider config={customTamaguiConfig}>
          <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: '#222831'}}}>
            <Stack.Screen name="(tabs)"/>
          </Stack>
        </TamaguiProvider>
    </SafeAreaProvider>
  );
}
