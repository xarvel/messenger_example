import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFragment, graphql } from "react-relay";
import { palette } from "@/src/palette";

type MessageItemProps = {
  dataRef: any;
  currentUserID: string;
};

export const MessageItem: FC<MessageItemProps> = ({
  dataRef,
  currentUserID,
}) => {
  const data = useFragment(
    graphql`
      fragment MessageItem_data on Message {
        id
        text
        senderName
        senderID
        creationDate
      }
    `,
    dataRef,
  );

  const side = data.senderID !== currentUserID ? "left" : "right";

  const backgroundColor = side !== "left" ? "#344054" : palette.white;
  const textColor = side !== "left" ? palette.textWhite : palette.textBlack;

  return (
    <View
      style={[styles.container, side === "right" ? styles.right : styles.left]}
    >
      <View
        style={[
          styles.messageContainer,
          {
            backgroundColor,
          },
        ]}
      >
        <Text
          style={{
            color: textColor,
          }}
        >
          {data.text}
        </Text>
      </View>

      <View
        style={[
          styles.metaContainer,
          {
            justifyContent: side === "left" ? "flex-start" : "flex-end",
          },
        ]}
      >
        <Text style={styles.metaText}>
          {data.senderName}{" "}
          {new Date(data.creationDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metaText: {
    color: "#667085",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  container: {
    marginVertical: 4,
    maxWidth: "70%",
    minWidth: "30%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  left: {
    marginRight: "auto",
    marginLeft: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  right: {
    marginLeft: "auto",
    marginRight: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
