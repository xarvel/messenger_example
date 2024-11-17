/* eslint prettier/prettier: ["error", { "printWidth": 60 }] */

import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageAddedSubscription as SubscriptionType } from "./__generated__/useMessageAddedSubscription.graphql";

export const useMessageAdded = (
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
          subscription useMessageAddedSubscription(
            $chatID: String!
            $connections: [ID!]!
          ) {
            messageAdded(chatID: $chatID)
              @appendEdge(connections: $connections) {
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
