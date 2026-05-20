import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 611 — Rewards tab B: "900 points earned" pill + same Deal rewards content.
// Same routing as 610.
export function Screen611RewardsTabB() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/611.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.085, left: 0.81, width: 0.15, height: 0.05, onPress: () => nav.popToTop(), debugLabel: 'Close' },
        { top: 0.205, left: 0.40, width: 0.08, height: 0.04, onPress: () => nav.navigate('NILRewardsInfo'), debugLabel: 'NIL info' },
        { top: 0.380, left: 0.36, width: 0.08, height: 0.04, onPress: () => nav.navigate('SoFiRewardsInfo'), debugLabel: 'SoFi info' },
      ]}
    />
  );
}
