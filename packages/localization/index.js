// @flow strict

import * as React from 'react';

import Translation from './src/Translation';
import TranslationFragment from './src/TranslationFragment';
import DateFormatter from './src/DateFormatter';
import DateUtils from './src/DateUtils';
import DeviceInfo from './src/GetDeviceLocale';
import type { TranslationKeys } from './src/DefaultVocabulary';

export {
  TranslationFragment,
  DateFormatter,
  DateUtils,
  DeviceInfo,
  Translation,
};

export type TranslationKeysType = TranslationKeys;

export type DateFormatterFunctions =
  | 'formatToDate'
  | 'formatToTime'
  | 'formatToShortDate'
  | 'formatToBirthday'
  | 'formatForMachine';

export type TranslationType =
  | React.Element<typeof Translation>
  | React.Element<typeof TranslationFragment>;
