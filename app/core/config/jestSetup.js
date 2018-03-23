// @flow

import './NativeModulesMocks/DeviceInfo';
import './NativeModulesMocks/RNLoggingModule';
import './NativeModulesMocks/RNTranslationManager';
import './NativeModulesMocks/RNColors';
import './NativeModulesMocks/RNCurrencyManager';

// Need to mock this, or tests using moment will fail
jest.mock('react-native-device-info');

beforeEach(() => {
  /**
   * Jest will swallow all `console.log` methods used in our code
   * and it will throw error for `console.error` methods. You have to
   * overwrite this mock if you want to test these logs (in the test):
   *
   * ```
   * let logs;
   * beforeEach(() => {
   *   logs = [];
   *   jest.spyOn(console, 'log')
   *       .mockImplementation((...args) => logs.push(args));
   * });
   * ```
   */
  // $FlowExpectedError: cannot overwrite console object
  console.log = jest.fn(); // eslint-disable-line no-console
});
