import React, { FC, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation, graphql } from "react-relay";
import { MessageInputMutation } from "@/src/__generated__/MessageInputMutation.graphql";
import { palette } from "@/src/palette";

type MessageInputProps = {
  connectionID: string;
  chatID: string;
};

export const MessageInput: FC<MessageInputProps> = ({
  connectionID,
  chatID,
}) => {
  const [commit] = useMutation<MessageInputMutation>(graphql`
    mutation MessageInputMutation(
      $input: SendMessageInput!
      $connections: [ID!]!
    ) {
      sendMessage(input: $input) {
        messageEdge @appendEdge(connections: $connections) {
          cursor
          node {
            ...MessageItem_data
          }
        }
      }
    }
  `);

  const [text, setText] = useState("");

  const handleSendMessage = () => {
    commit({
      variables: {
        input: {
          text: text,
          chatID,
        },
        connections: [connectionID],
      },
      onCompleted: () => {
        setText("");
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        placeholder="Сообщение..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <View
        style={{
          flexShrink: 0,
        }}
      >
        <Button title="Отправить" disabled={!text} onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    padding: 16,
    width: "100%",
    flexDirection: "row",
  },
  input: {
    padding: 10,
    overflow: "visible",
    color: palette.textBlack,
    flex: 1,
    flexGrow: 1,
  },
});
