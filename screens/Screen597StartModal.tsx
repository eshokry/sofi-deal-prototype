import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 597 — "Start the deal" modal over the deal landing.
export function Screen597StartModal() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/597.png')}
      aspectRatio={393 / 1008}
      zones={[
        { top: 0.504, left: 0.108, width: 0.78, height: 0.058,
          onPress: () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); nav.navigate('Progress33'); },
          debugLabel: 'Start the deal' },
        { top: 0.563, left: 0.108, width: 0.78, height: 0.058,
          onPress: () => nav.goBack(), debugLabel: 'Close' },
      ]}
    />
  );
}
