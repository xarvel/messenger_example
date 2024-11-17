/**
 * @generated SignedSource<<f2ca1546affff0f4e4f4a48e5e373683>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessagesList_meta$data = {
  readonly chat: {
    readonly participants: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  };
  readonly viewer: {
    readonly id: string;
  };
  readonly " $fragmentType": "MessagesList_meta";
};
export type MessagesList_meta$key = {
  readonly " $data"?: MessagesList_meta$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessagesList_meta">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "chatID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessagesList_meta",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "chatID"
        }
      ],
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "chat",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "participants",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "a17687106bbb38591d05761cd3e31382";

export default node;
