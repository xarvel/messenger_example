/**
 * @generated SignedSource<<36335191e335be5d3776591c899e76be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMessageAddedSubscriptionSubscription$variables = {
  chatID: string;
  connections: ReadonlyArray<string>;
};
export type useMessageAddedSubscriptionSubscription$data = {
  readonly messageAdded: {
    readonly cursor: string;
    readonly node: {
      readonly " $fragmentSpreads": FragmentRefs<"MessageItem_data">;
    };
  };
};
export type useMessageAddedSubscriptionSubscription = {
  response: useMessageAddedSubscriptionSubscription$data;
  variables: useMessageAddedSubscriptionSubscription$variables;
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
    "name": "useMessageAddedSubscriptionSubscription",
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
    "name": "useMessageAddedSubscriptionSubscription",
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
                "name": "senderName",
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
        "handle": "prependEdge",
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
    "cacheID": "c9ba27dbe2fb7ba8537cd24a563dcac5",
    "id": null,
    "metadata": {},
    "name": "useMessageAddedSubscriptionSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageAddedSubscriptionSubscription(\n  $chatID: String!\n) {\n  messageAdded(chatID: $chatID) {\n    cursor\n    node {\n      ...MessageItem_data\n      id\n    }\n  }\n}\n\nfragment MessageItem_data on Message {\n  id\n  text\n  senderName\n  senderID\n  creationDate\n}\n"
  }
};
})();

(node as any).hash = "bc42a4c9e473557cdb88c72a2399fd51";

export default node;
