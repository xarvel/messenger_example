/**
 * @generated SignedSource<<d2a0beedd1d8730ef2e528e2860be86e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMessageUpdatedSubscriptionSubscription$variables = {
  chatID: string;
};
export type useMessageUpdatedSubscriptionSubscription$data = {
  readonly messageUpdated: {
    readonly " $fragmentSpreads": FragmentRefs<"MessageItem_data">;
  };
};
export type useMessageUpdatedSubscriptionSubscription = {
  response: useMessageUpdatedSubscriptionSubscription$data;
  variables: useMessageUpdatedSubscriptionSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chatID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "chatID",
    "variableName": "chatID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMessageUpdatedSubscriptionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "messageUpdated",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMessageUpdatedSubscriptionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "messageUpdated",
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
    ]
  },
  "params": {
    "cacheID": "e0da116fddc14b062114f5fef22047c3",
    "id": null,
    "metadata": {},
    "name": "useMessageUpdatedSubscriptionSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageUpdatedSubscriptionSubscription(\n  $chatID: String!\n) {\n  messageUpdated(chatID: $chatID) {\n    ...MessageItem_data\n    id\n  }\n}\n\nfragment MessageItem_data on Message {\n  id\n  text\n  senderName\n  senderID\n  creationDate\n}\n"
  }
};
})();

(node as any).hash = "094ad2752b30b80aed43cf1fdbac1fa3";

export default node;
