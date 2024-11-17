/**
 * @generated SignedSource<<da0369abef35a753324c269c0c045867>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useMessageRemovedSubscriptionSubscription$variables = {
  chatID: string;
  connections: ReadonlyArray<string>;
};
export type useMessageRemovedSubscriptionSubscription$data = {
  readonly messageRemoved: {
    readonly messageIDs: ReadonlyArray<string>;
  };
};
export type useMessageRemovedSubscriptionSubscription = {
  response: useMessageRemovedSubscriptionSubscription$data;
  variables: useMessageRemovedSubscriptionSubscription$variables;
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
  "name": "messageIDs",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMessageRemovedSubscriptionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageRemovedResponse",
        "kind": "LinkedField",
        "name": "messageRemoved",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "useMessageRemovedSubscriptionSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageRemovedResponse",
        "kind": "LinkedField",
        "name": "messageRemoved",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "messageIDs",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "01e18784625c7f40a623a41791059df1",
    "id": null,
    "metadata": {},
    "name": "useMessageRemovedSubscriptionSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageRemovedSubscriptionSubscription(\n  $chatID: String!\n) {\n  messageRemoved(chatID: $chatID) {\n    messageIDs\n  }\n}\n"
  }
};
})();

(node as any).hash = "e285efdb4944dd6f9c52c4d7054cf1c7";

export default node;
