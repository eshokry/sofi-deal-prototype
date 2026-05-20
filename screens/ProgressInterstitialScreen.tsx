import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 605 — Progress interstitial "Let's go Jordan / 33%".
// Source: 393 × 880.
export function ProgressInterstitialScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer
      source={require('../assets/frames/605.png')}
      aspectRatio={393 / 880}
      zones={[
        // Keep going — primary CTA
        {
          top: 0.918, left: 0.108, width: 0.78, height: 0.067,
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate('DealStepsList');
          },
          debugLabel: 'Keep going',
        },
      ]}
    />
  );
}
