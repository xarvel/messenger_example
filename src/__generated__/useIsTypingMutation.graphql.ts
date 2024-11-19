/**
 * @generated SignedSource<<5351373f611e66c11f71222f6c97fe8e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useIsTypingMutation$variables = {
  chatID: string;
};
export type useIsTypingMutation$data = {
  readonly setTyping: boolean;
};
export type useIsTypingMutation = {
  response: useIsTypingMutation$data;
  variables: useIsTypingMutation$variables;
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
    "name": "setTyping",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useIsTypingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useIsTypingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "354580ebe2dc6c6ed1eaf49975da172d",
    "id": null,
    "metadata": {},
    "name": "useIsTypingMutation",
    "operationKind": "mutation",
    "text": "mutation useIsTypingMutation(\n  $chatID: String!\n) {\n  setTyping(chatID: $chatID)\n}\n"
  }
};
})();

(node as any).hash = "a92521f1828135e071875bfc2e0497cf";

export default node;
