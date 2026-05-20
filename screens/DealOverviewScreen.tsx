import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 597 — Deal overview with Start-the-deal modal overlay.
// Source: 393 × 1008.
export function DealOverviewScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer
      source={require('../assets/frames/597.png')}
      aspectRatio={393 / 1008}
      zones={[
        // Start the deal — primary CTA on the modal
        {
          top: 0.504, left: 0.108, width: 0.78, height: 0.058,
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate('Step1Signup');
          },
          debugLabel: 'Start the deal',
        },
        // Close — dismiss modal (for prototype, also routes forward)
        {
          top: 0.563, left: 0.108, width: 0.78, height: 0.058,
          onPress: () => navigation.goBack(),
          debugLabel: 'Close modal',
        },
        // Back arrow top-left
        {
          top: 0.06, left: 0.025, width: 0.16, height: 0.05,
          onPress: () => navigation.goBack(),
          debugLabel: 'Back',
        },
        // Dots menu top-right
        {
          top: 0.06, left: 0.81, width: 0.16, height: 0.05,
          onPress: () => {},
          debugLabel: 'Menu (TBD)',
        },
      ]}
    />
  );
}
