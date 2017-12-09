// @flow

import { Color } from '@kiwicom/native-common';

export default {
  navigationOptions: {
    headerStyle: {
      backgroundColor: Color.brand,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff', // back arrow
  },
  cardStyle: {
    backgroundColor: '#fff',
  },
  headerMode: 'screen',
};
