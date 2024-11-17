import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MessageInput } from "@/src/MessageInput";
import { MessagesList } from "@/src/MessagesList";
import { graphql, useLazyLoadQuery, ConnectionHandler } from "react-relay";
import { MessengerPageQuery } from "./__generated__/MessengerPageQuery.graphql";
import { useMessageAddedSubscription } from "@/src/useMessageAddedSubscription";
import { useMessageRemovedSubscription } from "@/src/useMessageRemovedSubscription";
import { useMessageUpdatedSubscription } from "@/src/useMessageUpdatedSubscription";
import { palette } from "@/src/palette";

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
        viewer {
          id
        }
        ...MessagesList_query @arguments(chatID: $chatID)
      }
    `,
    {
      chatID,
    },
    {
      fetchPolicy: "store-and-network",
    },
  );

  useMessageAddedSubscription(chatID, connectionID);
  useMessageRemovedSubscription(chatID, connectionID);
  useMessageUpdatedSubscription(chatID);

  return (
    <SafeAreaView style={styles.container}>
      <MessagesList queryRef={query} chunkSize={10} userID={query.viewer.id} />
      <MessageInput connectionID={connectionID} chatID={chatID} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
});
