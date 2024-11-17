/**
 * @generated SignedSource<<55e6e8d0ec662bfdb6158de3b1e515a9>>
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
    readonly currentUserID: string;
  };
  readonly " $fragmentType": "MessagesList_meta";
};
export type MessagesList_meta$key = {
  readonly " $data"?: MessagesList_meta$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessagesList_meta">;
};

const node: ReaderFragment = {
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currentUserID",
          "storageKey": null
        }
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

(node as any).hash = "f1456b69522cda123a7c768ca0fc12ce";

export default node;
