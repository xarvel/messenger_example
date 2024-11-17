import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageRemovedSubscriptionSubscription } from "./__generated__/useMessageRemovedSubscriptionSubscription.graphql";

export const useMessageRemovedSubscription = (
  chatID: string,
  connectionID: string,
) => {
  const config: GraphQLSubscriptionConfig<useMessageRemovedSubscriptionSubscription> =
    useMemo(
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
            messageRemoved(chatID: $chatID) @deleteEdge(connections: $connections)
          }
        `,
      }),
      [connectionID, chatID],
    );

  return useSubscription(config);
};
