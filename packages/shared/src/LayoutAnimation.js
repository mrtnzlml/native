// @flow strict

import { LayoutAnimation, NativeModules } from 'react-native'; // eslint-disable-line no-restricted-imports

// see: https://facebook.github.io/react-native/docs/layoutanimation.html
const { UIManager } = NativeModules;

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const linear = (animationSpeedMs: number = 50) =>
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      animationSpeedMs,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity,
    ),
  );

const Linear = {
  linear,
};

export default Linear;
