import { graphql, useSubscription } from "react-relay";
import { useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageUpdatedSubscriptionSubscription } from "./__generated__/useMessageUpdatedSubscriptionSubscription.graphql";

export const useMessageUpdatedSubscription = (chatID: string) => {
  const config: GraphQLSubscriptionConfig<useMessageUpdatedSubscriptionSubscription> = useMemo(
    () => ({
      variables: {
        chatID,
      },
      subscription: graphql`
        subscription useMessageUpdatedSubscriptionSubscription(
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
