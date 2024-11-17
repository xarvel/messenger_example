/**
 * @generated SignedSource<<a1cf2ffd10c18207a87bde601d9e3cc4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useMessageRemovedSubscription$variables = {
  chatID: string;
  connections: ReadonlyArray<string>;
};
export type useMessageRemovedSubscription$data = {
  readonly messageRemoved: ReadonlyArray<string>;
};
export type useMessageRemovedSubscription = {
  response: useMessageRemovedSubscription$data;
  variables: useMessageRemovedSubscription$variables;
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
    "name": "useMessageRemovedSubscription",
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
    "name": "useMessageRemovedSubscription",
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
    "cacheID": "b378e6d384e871de3c400933f22e149d",
    "id": null,
    "metadata": {},
    "name": "useMessageRemovedSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageRemovedSubscription(\n  $chatID: String!\n) {\n  messageRemoved(chatID: $chatID)\n}\n"
  }
};
})();

(node as any).hash = "71f6aeb038ee9a6975ebeeeed4bead3d";

export default node;
