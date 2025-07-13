import customTamaguiConfig from '@/tamagui.config';
import { Text, View } from "react-native";
import { Button, Stack, TamaguiProvider } from "tamagui";

export default function Index() {
  return (
    <TamaguiProvider config={customTamaguiConfig}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack></Stack>
        <Button backgroundColor='$dark'></Button>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </TamaguiProvider>
  );
}
