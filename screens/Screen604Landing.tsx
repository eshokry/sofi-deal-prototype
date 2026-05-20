import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 604 — Landing (main entry into the deal). 393×1008.
// Real behavior: card carousel is swipable; swipe-before-accept fires 597 modal.
// V2 simplification: tap the deal card → 597 modal (simulates swipe attempt).
export function Screen604Landing() {
  const nav = useNavigation<any>();
  const goStartModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('StartModal');
  };
  return (
    <ScreenContainer
      source={require('../assets/frames/604.png')}
      aspectRatio={393 / 1008}
      zones={[
        // Main deal card area — tap to simulate swipe-before-accept → 597 modal
        { top: 0.13, left: 0.04, width: 0.92, height: 0.40, onPress: goStartModal, debugLabel: 'Tap deal card (sim swipe)' },
        // 3-dots top-right — placeholder for menu1 modal (next commit)
        { top: 0.06, left: 0.81, width: 0.16, height: 0.05, onPress: () => {}, debugLabel: '3-dots (menu1 TBD)' },
        // Back arrow
        { top: 0.06, left: 0.025, width: 0.16, height: 0.05, onPress: () => nav.goBack(), debugLabel: 'Back' },
        // Suggested chips (601/602/603 — placeholder for next commit)
        { top: 0.75, left: 0.04, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
        { top: 0.75, left: 0.36, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
        { top: 0.75, left: 0.66, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
        // Terms link bottom
        { top: 0.95, left: 0.30, width: 0.50, height: 0.04, onPress: () => {}, debugLabel: 'Terms (TBD)' },
      ]}
    />
  );
}
