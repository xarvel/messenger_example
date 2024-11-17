import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  Observable,
} from "relay-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "graphql-ws";
import { SubscribeFunction } from "relay-runtime/lib/network/RelayNetworkTypes";
import { Sink } from "graphql-ws/lib/common";

const ENDPOINT = "localhost:3000/graphql";
const HTTP_ENDPOINT = "http://" + ENDPOINT;
const WEBSOCKET_ENDPOINT = "ws://" + ENDPOINT;

const fetchFn: FetchFunction = async (request, variables) => {
  const authorization = await AsyncStorage.getItem("authorization");
  const headers: RequestInit["headers"] = {
    Accept:
      "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
    "Content-Type": "application/json",
  };

  if (authorization) {
    headers["Authorization"] = authorization;
  }

  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  });

  return await resp.json();
};

const wsClient = createClient({
  url: () => WEBSOCKET_ENDPOINT,
  connectionParams: async () => {
    const authorization = await AsyncStorage.getItem("authorization");

    return {
      authorization,
    };
  },
  // on: {
  //   connecting: () => {
  //     console.log("on connecting");
  //   },
  //   message: (message) => {
  //     console.log("on message", message);
  //   },
  //   ping: (received) => {
  //     console.log("on ping", received);
  //   },
  //   closed: (event) => {
  //     console.log("on closed", event);
  //   },
  //   error: (error) => {
  //     console.log("on error", error);
  //   },
  //   connected: () => {
  //     console.log("on connected");
  //   },
  // },
});

const subscribe: SubscribeFunction = (operation, variables) => {
  return Observable.create((sink) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text as string,
        variables,
      },
      sink as Sink,
    );
  });
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn, subscribe),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
