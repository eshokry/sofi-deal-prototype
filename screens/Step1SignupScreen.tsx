import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 606 — Step 1: Create a SoFi account.
// Source: 393 × 920.
export function Step1SignupScreen() {
  const navigation = useNavigation<any>();

  const goNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('ProgressInterstitial');
  };

  return (
    <ScreenContainer
      source={require('../assets/frames/606.png')}
      aspectRatio={393 / 920}
      zones={[
        // Click here to start — primary CTA, opens SoFi (we navigate forward as simulation)
        {
          top: 0.357, left: 0.108, width: 0.78, height: 0.062,
          onPress: goNext,
          debugLabel: 'Click here to start',
        },
        // I've finished signing up — secondary CTA
        {
          top: 0.430, left: 0.108, width: 0.78, height: 0.062,
          onPress: goNext,
          debugLabel: "I've finished signing up",
        },
        // Back arrow
        {
          top: 0.066, left: 0.025, width: 0.16, height: 0.055,
          onPress: () => navigation.goBack(),
          debugLabel: 'Back',
        },
      ]}
    />
  );
}
