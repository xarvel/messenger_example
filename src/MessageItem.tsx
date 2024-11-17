import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFragment, graphql } from "react-relay";
import { palette } from "@/src/palette";

type MessageItemProps = {
  dataRef: any;
  getSide: (userID: string) => "left" | "right";
  getName: (userID: string) => string;
};

const sideMap = <A, B>(left: A, right: B) => ({
  left,
  right,
});

const printMessageTime = (date: Date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export const MessageItem: FC<MessageItemProps> = ({
  dataRef,
  getSide,
  getName,
}) => {
  const data = useFragment(
    graphql`
      fragment MessageItem_data on Message {
        id
        text
        senderID
        creationDate
      }
    `,
    dataRef,
  );
  const side = getSide(data.senderID);
  const backgroundColor = sideMap(palette.white, "#344054")[side];
  const textColor = sideMap(palette.textBlack, palette.textWhite)[side];
  const senderName = getName(data.senderID);

  return (
    <View style={[styles.container, sideMap(styles.left, styles.right)[side]]}>
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
            justifyContent: sideMap("flex-start" as const, "flex-end" as const)[
              side
            ],
          },
        ]}
      >
        <Text style={styles.metaText}>
          {`${senderName} ${printMessageTime(data.creationDate)}`}
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
