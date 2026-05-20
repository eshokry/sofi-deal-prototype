import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 604 — Landing. Tap-only interactions for v14b — swipe-to-modal
// gesture removed; will re-add once base taps are confirmed reliable.
export function Screen604Landing() {
  const nav = useNavigation<any>();

  const acceptDeal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    nav.navigate('Progress33');
  };

  return (
    <ScreenContainer
      source={require('../assets/frames/604.png')}
      aspectRatio={393 / 1008}
      fixedBottomFrac={0.78}
      debug
      zones={[
        { top: 0.066, left: 0.025, width: 0.18, height: 0.046, onPress: () => nav.goBack(), debugLabel: 'Back' },
        { top: 0.066, left: 0.795, width: 0.18, height: 0.046, onPress: () => {}, debugLabel: '3-dots (menu1 TBD)' },
        { top: 0.679, left: 0.075, width: 0.85, height: 0.062, onPress: acceptDeal, debugLabel: 'Start the deal' },
        { top: 0.820, left: 0.04, width: 0.30, height: 0.066, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
        { top: 0.820, left: 0.36, width: 0.30, height: 0.066, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
        { top: 0.820, left: 0.66, width: 0.30, height: 0.066, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
        { top: 0.955, left: 0.65, width: 0.30, height: 0.030, onPress: () => {}, debugLabel: 'Terms (TBD)' },
      ]}
    />
  );
}
