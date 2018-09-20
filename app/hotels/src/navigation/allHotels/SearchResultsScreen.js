// @flow strict

import * as React from 'react';
import { View } from 'react-native';
import { type NavigationType } from '@kiwicom/mobile-navigation';
import {
  LayoutDoubleColumn,
  StyleSheet,
  AdaptableLayout,
  GestureController,
  TextIcon,
  CloseButton,
} from '@kiwicom/mobile-shared';
import { defaultTokens } from '@kiwicom/mobile-orbit';
import { SafeAreaView } from 'react-navigation';

import NewAllHotels from '../../allHotels/NewAllHotels';
import MapHeaderButton from './MapHeaderButton';
import HotelsNavigationOptions from '../HotelsNavigationOptions';
import {
  withSearchResultsContext,
  type ResultType,
} from './SearchResultsContext';
import SingleHotelContainer from '../../singleHotel/SingleHotelContainer';
import type { RoomsConfiguration } from '../../singleHotel/AvailableHotelSearchInput';
import SingleHotelContext from '../singleHotel/SingleHotelContext';

type Props = {|
  +navigation: NavigationType,
  +onBackClicked: () => void,
  +cityName: string,
  +checkin: string,
  +checkout: string,
  +roomsConfiguration: RoomsConfiguration,
  +lastNavigationMode?: 'present' | 'push',
  +setResultType: (show: ResultType) => void,
  +show: ResultType,
  +bookingComAffiliate: string,
|};

const noop = () => {};

class SearchResultsScreen extends React.Component<Props> {
  static navigationOptions = ({
    checkin,
    checkout,
    cityName,
    navigation,
    show,
  }: Props) => {
    function goToAllHotelsMap() {
      const showNext = show === 'list' ? 'map' : 'list';
      navigation.state.params.toggleMap(showNext);
    }
    const icon =
      show === 'list' ? (
        <TextIcon code="&#xe001;" orbit={true} />
      ) : (
        <TextIcon code="&#xe115;" orbit={true} />
      );
    return {
      ...HotelsNavigationOptions({ checkin, checkout, cityName }),
      headerRight: (
        <React.Fragment>
          {checkin !== null && (
            <AdaptableLayout
              renderOnNarrow={
                <MapHeaderButton onPress={goToAllHotelsMap} icon={icon} />
              }
            />
          )}
        </React.Fragment>
      ),
    };
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
      toggleMap: this.toggleShowMap,
      show: this.props.show,
    });
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.show !== this.props.show) {
      this.props.navigation.setParams({
        show: this.props.show,
      });
    }
  };

  toggleShowMap = (show: ResultType) => this.props.setResultType(show);

  onClosePress = () => {
    // This prop will only come if we launch this screen from a native app
    if (this.props.lastNavigationMode === 'present') {
      GestureController.closeModal('NewKiwiHotels');
    } else {
      this.props.onBackClicked();
    }
  };

  render = () => (
    <SingleHotelContext.Provider
      hotelId={''}
      checkin={new Date(this.props.checkin)}
      checkout={new Date(this.props.checkout)}
      roomsConfiguration={this.props.roomsConfiguration}
      bookingComAffiliate={this.props.bookingComAffiliate}
    >
      <LayoutDoubleColumn
        menuComponent={
          <SafeAreaView style={[styles.container, styles.safeArea]}>
            <View style={styles.container}>
              <NewAllHotels />
              <View style={styles.button}>
                <CloseButton onPress={this.onClosePress} />
              </View>
            </View>
          </SafeAreaView>
        }
        containerComponent={<SingleHotelContainer goBack={noop} />}
      />
    </SingleHotelContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: defaultTokens.paletteWhite,
  },
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 8,
    start: 8,
    end: 8,
  },
});

export default withSearchResultsContext(state => ({
  setResultType: state.setResultType,
  show: state.show,
}))(SearchResultsScreen);
