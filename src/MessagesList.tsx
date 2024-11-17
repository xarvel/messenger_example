/* eslint prettier/prettier: ["error", { "printWidth": 60 }] */

import React, { FC, useRef } from "react";
import { FlatList } from "react-native";
import {
  graphql,
  usePaginationFragment,
} from "react-relay";
import { MessageItem } from "@/src/MessageItem";
import { MessagesList_query$key } from "@/src/__generated__/MessagesList_query.graphql";

type MessagesListProps = {
  queryRef: MessagesList_query$key;
  chunkSize: number;
  userID: string;
};

const query = graphql`
  fragment MessagesList_query on Query
  @argumentDefinitions(
    chatID: { type: "ID!" }
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 10 }
  )
  @refetchable(queryName: "MessagesListPaginationQuery") {
    messages(
      last: $count
      before: $cursor
      chatID: $chatID
    ) @connection(key: "MessagesListQuery_messages") {
      edges {
        cursor
        node {
          ...MessageItem_data
        }
      }
    }
  }
`;

export const MessagesList: FC<MessagesListProps> = ({
  queryRef,
  chunkSize,
  userID,
}) => {
  const { data, refetch, loadPrevious, hasPrevious } =
    usePaginationFragment(query, queryRef);

  console.log('data', data.messages.edges);

  const flatListRef = useRef(null);

  return (
    <FlatList
      ref={flatListRef}
      inverted
      refreshing={false}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
      style={{
        backgroundColor: "#EFF5FB",
      }}
      onEndReachedThreshold={0.2}
      onEndReached={() => {
        if (hasPrevious) {
          loadPrevious(chunkSize);
        }
      }}
      onRefresh={() => {
        refetch({
          count: chunkSize,
        });
      }}
      keyExtractor={(item) => item.cursor}
      data={data.messages.edges}
      renderItem={({ item }) => (
        <MessageItem
          currentUserID={userID}
          dataRef={item.node}
        />
      )}
    />
  );
};
