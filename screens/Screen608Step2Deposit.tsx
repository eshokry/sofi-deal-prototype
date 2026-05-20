import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, TapZone } from '../components/ScreenContainer';
import { useDealState } from '../state/DealState';

// Frame 608 — Step 3: Deposit at least $10. Same first-entry/return state
// machine as Screen606. Primary "Open SoFi to deposit" must be tapped before
// "I deposited $10" becomes active.
export function Screen608Step2Deposit() {
  const nav = useNavigation<any>();
  const { step2VisitedSoFi, markStep2Visited } = useDealState();

  const onPrimary = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    markStep2Visited();
  };

  const onSecondary = () => {
    if (!step2VisitedSoFi) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('Verifying');
  };

  const zones: TapZone[] = [
    { top: 0.045, left: 0.025, width: 0.16, height: 0.05, onPress: () => nav.goBack(), debugLabel: 'Back' },
    { top: 0.045, left: 0.81, width: 0.16, height: 0.05, onPress: () => {}, debugLabel: '3-dots (menu2 TBD)' },
    { top: 0.343, left: 0.108, width: 0.78, height: 0.062, onPress: onPrimary, debugLabel: 'Open SoFi to deposit' },
    { top: 0.414, left: 0.108, width: 0.78, height: 0.062, onPress: onSecondary, debugLabel: 'I deposited $10' },
    { top: 0.835, left: 0.04, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
    { top: 0.835, left: 0.36, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
    { top: 0.835, left: 0.66, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
  ];

  return (
    <ScreenContainer
      source={require('../assets/frames/608.png')}
      aspectRatio={393 / 920}
      stickyTopFrac={0.13}
      stickyBottomFrac={0.82}
      scrollEnabled={false}
      zones={zones}
    />
  );
}
