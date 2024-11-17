import React, { FC } from "react";
import { SafeAreaView } from "react-native";
import { MessageInput } from "@/src/MessageInput";
import { MessagesList } from "@/src/MessagesList";
import { graphql, useLazyLoadQuery, ConnectionHandler } from "react-relay";
import { MessengerChatQuery } from "@/src/__generated__/MessengerChatQuery.graphql";
import { useMessageAddedSubscription } from "@/src/useMessageAddedSubscription";
import { useMessageRemovedSubscription } from "@/src/useMessageRemovedSubscription";
import { useMessageUpdatedSubscription } from "@/src/useMessageUpdatedSubscription";

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

  const query = useLazyLoadQuery<MessengerChatQuery>(
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <MessagesList queryRef={query} chunkSize={10} userID={query.viewer.id} />
      <MessageInput connectionID={connectionID} chatID={chatID} />
    </SafeAreaView>
  );
};
