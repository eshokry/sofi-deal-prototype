import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 605 — Progress arc 33%, "Let's go Jordan".
// Fires right after the user accepts the deal (Step 1 = acceptance, +5 pts).
export function Screen605Progress33() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/605.png')}
      aspectRatio={393 / 880}
      zones={[
        { top: 0.918, left: 0.108, width: 0.78, height: 0.067,
          onPress: () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); nav.navigate('Step1Account'); },
          debugLabel: 'Keep going' },
      ]}
    />
  );
}
