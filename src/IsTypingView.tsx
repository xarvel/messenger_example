import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette } from "@/src/palette";

type IsTypingViewProps = {
  name: string;
};

export const IsTypingView: FC<IsTypingViewProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${name} печатает...`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  text: {
    color: palette.textBlack,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
});
