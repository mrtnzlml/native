/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type BookNow_hotel$ref = any;
type Header_hotel$ref = any;
type HotelInformation_hotel$ref = any;
type RoomList$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type HotelDetailScreen_availableHotel$ref: FragmentReference;
export type HotelDetailScreen_availableHotel = {|
  +hotel: ?{|
    +$fragmentRefs: Header_hotel$ref & BookNow_hotel$ref & HotelInformation_hotel$ref
  |},
  +availableRooms: ?$ReadOnlyArray<?{|
    +id: string,
    +incrementalPrice: ?$ReadOnlyArray<?{|
      +amount: ?number,
      +currency: ?string,
    |}>,
    +$fragmentRefs: RoomList$ref,
  |}>,
  +$refType: HotelDetailScreen_availableHotel$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "HotelDetailScreen_availableHotel",
  "type": "HotelAvailabilityInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "hotel",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Header_hotel",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "BookNow_hotel",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "HotelInformation_hotel",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "availableRooms",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RoomList",
          "args": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "incrementalPrice",
          "storageKey": null,
          "args": null,
          "concreteType": "Price",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "currency",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'a98983e9d66695b7ab62938bd14f4f9f';
module.exports = node;
