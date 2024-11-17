/* eslint prettier/prettier: ["error", { "printWidth": 60 }] */

import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageRemovedSubscription as SubscriptionType } from "./__generated__/useMessageRemovedSubscription.graphql";

export const useMessageRemoved = (
  chatID: string,
  connectionID: string,
) => {
  const config: GraphQLSubscriptionConfig<SubscriptionType> =
    useMemo(
      () => ({
        variables: {
          chatID,
          connections: [connectionID],
        },
        subscription: graphql`
          subscription useMessageRemovedSubscription(
            $chatID: String!
            $connections: [ID!]!
          ) {
            messageRemoved(chatID: $chatID)
              @deleteEdge(connections: $connections)
          }
        `,
      }),
      [connectionID, chatID],
    );

  return useSubscription(config);
};
