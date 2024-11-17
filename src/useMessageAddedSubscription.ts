import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageAddedSubscriptionSubscription } from "./__generated__/useMessageAddedSubscriptionSubscription.graphql";

export const useMessageAddedSubscription = (
  chatID: string,
  connectionID: string,
) => {
  const config: GraphQLSubscriptionConfig<useMessageAddedSubscriptionSubscription> =
    useMemo(
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
