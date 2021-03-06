// @flow

module.exports = {
  preset: 'react-native',
  globals: {
    __DEV__: false,
  },
  setupFilesAfterEnv: ['<rootDir>/app/core/config/jestSetup.js'],
  testPathIgnorePatterns: ['/node_modules/', '__tests__/__mocks__'],
  transformIgnorePatterns: ['/node_modules/(?!@kiwicom)/'],
  modulePathIgnorePatterns: ['/.build/', '/e2e/'],
  moduleNameMapper: {
    '^@kiwicom/universal-components$':
      '<rootDir>/node_modules/@kiwicom/universal-components/lib/native',
    '^.+\\.ttf$': '<rootDir>/__mocks__/fileMock.js',
  },
};
