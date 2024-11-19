import { graphql, useMutation, useSubscription } from "react-relay";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useMessageUpdatedSubscription as SubscriptionType } from "@/src/__generated__/useMessageUpdatedSubscription.graphql";
import { useMemo } from "react";

export const useIsTyping = (chatID: string) => {
  const [commit] = useMutation<any>(graphql`
        mutation useIsTypingMutation($chatID: String!) {
           setTyping(chatID: $chatID)
        }
    `);

  const config: GraphQLSubscriptionConfig<SubscriptionType> = useMemo(
    () => ({
      variables: {
        chatID,
      },
      subscription: graphql`
        subscription useIsTypingSubscription($chatID: String!) {
          isTyping(chatID: $chatID) 
        }
      `,
    }),
    [chatID],
  );

  useSubscription(config);

  const isTyping = false;

  const handleSetTyping = () => {};

  return [isTyping, isTyping];
};
