import "react-native-reanimated";

import { RelayEnvironment } from "@/transport/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Suspense } from "react";

export default function RootLayout() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<View></View>}>
        <Stack initialRouteName="index">
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              title: "",
            }}
          />
          <Stack.Screen
            name="messenger"
            options={{
              title: "Сообщения",
              headerBackTitle: "Назад",
            }}
          />
        </Stack>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
