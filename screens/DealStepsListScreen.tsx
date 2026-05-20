import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 624 — Deal steps list (accordion).
// Source: 393 × 920.
export function DealStepsListScreen() {
  const navigation = useNavigation<any>();

  const tap = (label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // For prototype: any step tap routes to completion.
    navigation.navigate('DealComplete');
  };

  return (
    <ScreenContainer
      source={require('../assets/frames/624.png')}
      aspectRatio={393 / 920}
      zones={[
        // Close (X)
        {
          top: 0.080, left: 0.81, width: 0.15, height: 0.05,
          onPress: () => navigation.goBack(),
          debugLabel: 'Close',
        },
        // Introduction row
        { top: 0.138, left: 0.04, width: 0.92, height: 0.075, onPress: () => tap('Intro'), debugLabel: 'Intro' },
        // Open your account row
        { top: 0.220, left: 0.04, width: 0.92, height: 0.075, onPress: () => tap('Open account'), debugLabel: 'Open account' },
        // Deposit at least $10 row (expanded)
        { top: 0.303, left: 0.04, width: 0.92, height: 0.14, onPress: () => tap('Deposit'), debugLabel: 'Deposit' },
        // Claim rewards row
        { top: 0.480, left: 0.04, width: 0.92, height: 0.075, onPress: () => tap('Claim rewards'), debugLabel: 'Claim rewards' },
      ]}
    />
  );
}
