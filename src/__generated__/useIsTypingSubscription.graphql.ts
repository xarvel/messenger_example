/**
 * @generated SignedSource<<4e2a7fce0590b2fb42e2e641793a60f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useIsTypingSubscription$variables = {
  chatID: string;
};
export type useIsTypingSubscription$data = {
  readonly isTyping: string;
};
export type useIsTypingSubscription = {
  response: useIsTypingSubscription$data;
  variables: useIsTypingSubscription$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "chatID",
        "variableName": "chatID"
      }
    ],
    "kind": "ScalarField",
    "name": "isTyping",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useIsTypingSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useIsTypingSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b18bc20910892d8ad3bdf9b87edafc56",
    "id": null,
    "metadata": {},
    "name": "useIsTypingSubscription",
    "operationKind": "subscription",
    "text": "subscription useIsTypingSubscription(\n  $chatID: String!\n) {\n  isTyping(chatID: $chatID)\n}\n"
  }
};
})();

(node as any).hash = "3401aec8268e0fb67b2a94afdc43b245";

export default node;
