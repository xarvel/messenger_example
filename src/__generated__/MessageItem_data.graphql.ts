/**
 * @generated SignedSource<<f3116ae743911e14f9d81dd9653d16de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageItem_data$data = {
  readonly creationDate: any;
  readonly id: string;
  readonly senderID: string;
  readonly senderName: string;
  readonly text: string;
  readonly " $fragmentType": "MessageItem_data";
};
export type MessageItem_data$key = {
  readonly " $data"?: MessageItem_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageItem_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageItem_data",
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
  "type": "Message",
  "abstractKey": null
};

(node as any).hash = "2a311ce8c7c9bd9e08bb84abaaca15fb";

export default node;
