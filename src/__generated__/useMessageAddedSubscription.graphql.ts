/**
 * @generated SignedSource<<bd7e8dfbb9b84cdd4389d60cda456c98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMessageAddedSubscription$variables = {
  chatID: string;
  connections: ReadonlyArray<string>;
};
export type useMessageAddedSubscription$data = {
  readonly messageAdded: {
    readonly cursor: string;
    readonly node: {
      readonly " $fragmentSpreads": FragmentRefs<"MessageItem_data">;
    };
  };
};
export type useMessageAddedSubscription = {
  response: useMessageAddedSubscription$data;
  variables: useMessageAddedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chatID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "chatID",
    "variableName": "chatID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMessageAddedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageEdge",
        "kind": "LinkedField",
        "name": "messageAdded",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MessageItem_data"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMessageAddedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageEdge",
        "kind": "LinkedField",
        "name": "messageAdded",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "senderID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "creationDate",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "messageAdded",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "4d765cfc9ae901e4586944d18ca911b1",
    "id": null,
    "metadata": {},
    "name": "useMessageAddedSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageAddedSubscription(\n  $chatID: String!\n) {\n  messageAdded(chatID: $chatID) {\n    cursor\n    node {\n      ...MessageItem_data\n      id\n    }\n  }\n}\n\nfragment MessageItem_data on Message {\n  id\n  text\n  senderID\n  creationDate\n}\n"
  }
};
})();

(node as any).hash = "0aa263e8d97d8e027f94ffa6faae1f6d";

export default node;
