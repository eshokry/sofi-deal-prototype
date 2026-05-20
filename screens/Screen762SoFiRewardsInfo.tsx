import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 762 — SoFi Rewards info popup.
export function Screen762SoFiRewardsInfo() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/762.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.530, left: 0.81, width: 0.15, height: 0.04, onPress: () => nav.goBack(), debugLabel: 'Close' },
        { top: 0.480, left: 0.108, width: 0.78, height: 0.060, onPress: () => nav.goBack(), debugLabel: 'Got it' },
      ]}
    />
  );
}
