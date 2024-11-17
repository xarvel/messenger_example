import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { MessengerChatSubscription } from "@/src/__generated__/MessengerChatSubscription.graphql";

export const useMessageAddedSubscription = (
  chatID: string,
  connectionID: string,
) => {
  const config: GraphQLSubscriptionConfig<MessengerChatSubscription> = useMemo(
    () => ({
      variables: {
        chatID,
        connections: [connectionID],
      },
      subscription: graphql`
        subscription useMessageAddedSubscriptionSubscription(
          $chatID: String!
          $connections: [ID!]!
        ) {
          messageAdded(chatID: $chatID)
            @prependEdge(connections: $connections) {
            cursor
            node {
              ...MessageItem_data
            }
          }
        }
      `,
    }),
    [connectionID, chatID],
  );

  return useSubscription(config);
};
