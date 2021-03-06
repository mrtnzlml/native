/**
 * @flow
 */

/* eslint-disable */
// flowlint untyped-type-import:off

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Location_hotel$ref: FragmentReference;
declare export opaque type Location_hotel$fragmentType: Location_hotel$ref;
export type Location_hotel = {|
  +address: ?{|
    +street: ?string,
    +city: ?string,
  |},
  +coordinates: ?{|
    +lat: ?number,
    +lng: ?number,
  |},
  +$refType: Location_hotel$ref,
|};
export type Location_hotel$data = Location_hotel;
export type Location_hotel$key = {
  +$data?: Location_hotel$data,
  +$fragmentRefs: Location_hotel$ref,
  ...
};


const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Location_hotel",
  "type": "HotelInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "address",
      "storageKey": null,
      "args": null,
      "concreteType": "Address",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "street",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "city",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "coordinates",
      "storageKey": null,
      "args": null,
      "concreteType": "Coordinates",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "lat",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "lng",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node: any).hash = '31c5d4b67f70b638a1019503b8bc7a29';
export default node;
