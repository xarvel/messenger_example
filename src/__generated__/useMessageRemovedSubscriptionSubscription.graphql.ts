/**
 * @generated SignedSource<<de1801f0607aa2c34fbe40bc7667fd94>>
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
  readonly messageRemoved: ReadonlyArray<string | null | undefined>;
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
  "args": (v1/*: any*/),
  "kind": "ScalarField",
  "name": "messageRemoved",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMessageRemovedSubscriptionSubscription",
    "selections": [
      (v2/*: any*/)
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
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "deleteEdge",
        "key": "",
        "kind": "ScalarHandle",
        "name": "messageRemoved",
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
    "cacheID": "a57dc59b0bb1543772dda2d674e91b59",
    "id": null,
    "metadata": {},
    "name": "useMessageRemovedSubscriptionSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageRemovedSubscriptionSubscription(\n  $chatID: String!\n) {\n  messageRemoved(chatID: $chatID)\n}\n"
  }
};
})();

(node as any).hash = "4c9d11e84b7d4ef6c8f1ca0eaa50e644";

export default node;
