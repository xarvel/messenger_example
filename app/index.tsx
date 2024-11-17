import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function IndexScreen() {
  const loginAs = (key: string) => {
    AsyncStorage.setItem("authorization", key);

    router.navigate("/messenger");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Login As
        </Text>
        <Button
          title="User 1"
          onPress={() => {
            loginAs("user1");
          }}
        />
        <Button
          title="User 2"
          onPress={() => {
            loginAs("user2");
          }}
        />
      </View>
    </View>
  );
}
