import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 608 — Step 3: Deposit at least $10. (Third deal step.)
// Real behavior: first entry primary CTA only ("Open SoFi to deposit") → external;
// after return, secondary populates ("I deposited $10") → advances to 641 verifying.
// V2 simplification: both visible, both advance.
export function Screen608Step2Deposit() {
  const nav = useNavigation<any>();
  const advance = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('Verifying');
  };
  return (
    <ScreenContainer
      source={require('../assets/frames/608.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.345, left: 0.108, width: 0.78, height: 0.062, onPress: advance, debugLabel: 'Open SoFi to deposit' },
        { top: 0.416, left: 0.108, width: 0.78, height: 0.062, onPress: advance, debugLabel: 'I deposited $10' },
        { top: 0.066, left: 0.025, width: 0.16, height: 0.055, onPress: () => nav.goBack(), debugLabel: 'Back' },
      ]}
    />
  );
}
