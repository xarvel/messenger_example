import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";

export const useMessageRemovedSubscription = (
  chatID: string,
  connectionID: string,
) => {
  const config: GraphQLSubscriptionConfig<any> = useMemo(
    () => ({
      variables: {
        chatID,
        connections: [connectionID],
      },
      subscription: graphql`
        subscription useMessageRemovedSubscriptionSubscription(
          $chatID: String!
          $connections: [ID!]!
        ) {
          messageRemoved(chatID: $chatID) {
            messageIDs @deleteEdge(connections: $connections)
          }
        }
      `,
    }),
    [connectionID, chatID],
  );

  return useSubscription(config);
};
