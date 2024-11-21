import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MessageInput } from "@/src/MessageInput";
import { MessagesList } from "@/src/MessagesList";
import { graphql, useLazyLoadQuery, ConnectionHandler } from "react-relay";
import { MessengerPageQuery } from "./__generated__/MessengerPageQuery.graphql";
import { useMessageAdded } from "@/src/useMessageAdded";
import { useMessageRemoved } from "@/src/useMessageRemoved";
import { useMessageUpdated } from "@/src/useMessageUpdated";
import { palette } from "@/src/palette";
import { useIsTyping } from "@/src/useIsTyping";

type MessengerChatProps = {
  chatID: string;
};

export const MessengerPage: FC<MessengerChatProps> = ({ chatID }) => {
  const connectionID = ConnectionHandler.getConnectionID(
    "client:root",
    "MessagesListQuery_messages",
    {
      chatID,
    },
  );

  const query = useLazyLoadQuery<MessengerPageQuery>(
    graphql`
      query MessengerPageQuery($chatID: ID!) {
        ...MessagesList_meta @arguments(chatID: $chatID)
        ...MessagesList_messages @arguments(chatID: $chatID)
      }
    `,
    {
      chatID,
    },
    {
      fetchPolicy: "store-and-network",
    },
  );

  useMessageAdded(chatID, connectionID);
  useMessageRemoved(chatID, connectionID);
  useMessageUpdated(chatID);

  const [isTyping, setIsTyping] = useIsTyping(chatID);

  console.log("isTyping", isTyping);

  return (
    <SafeAreaView style={styles.container}>
      <MessagesList
        messagesRef={query}
        metaRef={query}
        chunkSize={20}
        isTypingUser={isTyping}
      />
      <MessageInput
        connectionID={connectionID}
        chatID={chatID}
        onType={setIsTyping}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
});
