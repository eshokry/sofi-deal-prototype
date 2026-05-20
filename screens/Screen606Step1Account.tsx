import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 606 — Step 2: Create a SoFi account. (Second deal step; first was acceptance.)
// Real behavior: first entry shows ONLY primary CTA "Click here to start" → external SoFi;
// after return, secondary CTA "I've finished signing up" populates → advances to 607.
// V2 simplification: both visible, both advance.
export function Screen606Step1Account() {
  const nav = useNavigation<any>();
  const advance = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('Progress66');
  };
  return (
    <ScreenContainer
      source={require('../assets/frames/606.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.357, left: 0.108, width: 0.78, height: 0.062, onPress: advance, debugLabel: 'Click here to start' },
        { top: 0.430, left: 0.108, width: 0.78, height: 0.062, onPress: advance, debugLabel: "I've finished signing up" },
        { top: 0.066, left: 0.025, width: 0.16, height: 0.055, onPress: () => nav.goBack(), debugLabel: 'Back' },
      ]}
    />
  );
}
