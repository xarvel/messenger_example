/* eslint prettier/prettier: ["error", { "printWidth": 60 }] */

import React, { FC } from "react";
import { FlatList } from "react-native";
import {
  graphql,
  useFragment,
  usePaginationFragment,
} from "react-relay";
import { MessageItem } from "@/src/MessageItem";
import { MessagesList_messages$key } from "@/src/__generated__/MessagesList_messages.graphql";
import { palette } from "@/src/palette";
import { MessagesList_meta$key } from "@/src/__generated__/MessagesList_meta.graphql";

type MessagesListProps = {
  messagesRef: MessagesList_messages$key;
  metaRef: MessagesList_meta$key;
  chunkSize: number;
};

const messagesQuery = graphql`
  fragment MessagesList_messages on Query
  @argumentDefinitions(
    chatID: { type: "ID!" }
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 20 }
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

const metaInfoQuery = graphql`
  fragment MessagesList_meta on Query
  @argumentDefinitions(chatID: { type: "ID!" }) {
    viewer {
      currentUserID
    }
    chat(id: $chatID) {
      participants {
        id
        name
      }
    }
  }
`;

export const MessagesList: FC<MessagesListProps> = ({
  messagesRef,
  chunkSize,
  metaRef,
}) => {
  const { data, refetch, loadPrevious, hasPrevious } =
    usePaginationFragment(messagesQuery, messagesRef);

  console.log('hasPrevious', hasPrevious);
  const { viewer, chat } = useFragment(
    metaInfoQuery,
    metaRef,
  );

  const NamesMap = chat.participants.reduce(
    (acc, curr) => {
      acc[curr.id] = curr.name;
      return acc;
    },
    {} as Record<string, string>,
  );

  const getSide = (userID: string) =>
    userID !== viewer.currentUserID ? "left" : "right";

  const getName = (userID: string) => NamesMap[userID];

  return (
    <FlatList
      inverted
      refreshing={false}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
      style={{
        backgroundColor: palette.chatBackground,
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
      data={data.messages.edges.slice().reverse()}
      renderItem={({ item }) => (
        <MessageItem
          getSide={getSide}
          getName={getName}
          dataRef={item.node}
        />
      )}
    />
  );
};
