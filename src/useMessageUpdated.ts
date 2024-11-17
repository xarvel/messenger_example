/* eslint prettier/prettier: ["error", { "printWidth": 60 }] */

import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageUpdatedSubscription as SubscriptionType } from "./__generated__/useMessageUpdatedSubscription.graphql";

export const useMessageUpdated = (chatID: string) => {
  const config: GraphQLSubscriptionConfig<SubscriptionType> =
    useMemo(
      () => ({
        variables: {
          chatID,
        },
        subscription: graphql`
          subscription useMessageUpdatedSubscription(
            $chatID: String!
          ) {
            messageUpdated(chatID: $chatID) {
              ...MessageItem_data
            }
          }
        `,
      }),
      [chatID],
    );

  return useSubscription(config);
};
