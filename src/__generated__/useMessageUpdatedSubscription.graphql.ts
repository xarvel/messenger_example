/**
 * @generated SignedSource<<7c8284ce8c87fe6406aef12fe309b1ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMessageUpdatedSubscription$variables = {
  chatID: string;
};
export type useMessageUpdatedSubscription$data = {
  readonly messageUpdated: {
    readonly " $fragmentSpreads": FragmentRefs<"MessageItem_data">;
  };
};
export type useMessageUpdatedSubscription = {
  response: useMessageUpdatedSubscription$data;
  variables: useMessageUpdatedSubscription$variables;
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
    "name": "useMessageUpdatedSubscription",
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
    "name": "useMessageUpdatedSubscription",
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
    "cacheID": "6b1fc71cb3a198f1729ae8c14419cc13",
    "id": null,
    "metadata": {},
    "name": "useMessageUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageUpdatedSubscription(\n  $chatID: String!\n) {\n  messageUpdated(chatID: $chatID) {\n    ...MessageItem_data\n    id\n  }\n}\n\nfragment MessageItem_data on Message {\n  id\n  text\n  senderName\n  senderID\n  creationDate\n}\n"
  }
};
})();

(node as any).hash = "428ea45c3bceef50c0893db0bd59f654";

export default node;
