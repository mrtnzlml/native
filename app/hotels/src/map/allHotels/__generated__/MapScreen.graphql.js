/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type HotelSwipeList$ref = any;
type MapView$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MapScreen$ref: FragmentReference;
export type MapScreen = $ReadOnlyArray<{|
  +node: ?{|
    +id: string
  |},
  +$fragmentRefs: MapView$ref & HotelSwipeList$ref,
  +$refType: MapScreen$ref,
|}>;
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "MapScreen",
  "type": "HotelAvailabilityEdge",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "node",
      "storageKey": null,
      "args": null,
      "concreteType": "HotelAvailability",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "MapView",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "HotelSwipeList",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '2126f43c3311a7ac2f147083c81044c5';
module.exports = node;
