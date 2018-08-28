// @flow

import * as React from 'react';

import type { RoomConfigurationType } from '../../HotelsContext';

const defaultState = {
  hotelId: '',
  checkin: new Date(),
  checkout: new Date(),
  roomsConfiguration: [],
  bookingComAffiliate: '',
};

const { Consumer, Provider: ContextProvider } = React.createContext({
  ...defaultState,
});

type Props = {|
  +children: React.Node,
  +hotelId: string,
  +checkin: Date,
  +checkout: Date,
  +roomsConfiguration: $ReadOnlyArray<RoomConfigurationType>,
  +bookingComAffiliate: string,
|};

type State = {|
  +hotelId: string,
  +checkin: Date,
  +checkout: Date,
  +roomsConfiguration: $ReadOnlyArray<RoomConfigurationType>,
  +bookingComAffiliate: string,
|};

class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hotelId: props.hotelId,
      checkin: props.checkin,
      checkout: props.checkout,
      roomsConfiguration: props.roomsConfiguration,
      bookingComAffiliate: props.bookingComAffiliate,
    };
  }

  render = () => (
    <ContextProvider value={this.state}>{this.props.children}</ContextProvider>
  );
}

export default { Consumer, Provider };
