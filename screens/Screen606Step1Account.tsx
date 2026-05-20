import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, TapZone } from '../components/ScreenContainer';
import { useDealState } from '../state/DealState';

// Frame 606 — Step 2 in the flow: Create a SoFi account.
// State machine:
//   - First entry: ONLY "Click here to start" primary CTA is tappable. Tapping
//     it marks the user as having visited SoFi (simulates external nav).
//   - After visiting: "I've finished signing up" secondary CTA becomes
//     tappable. Tapping advances to 607 Progress 66%.
//
// V2 implementation note: the PNG always SHOWS both CTAs (since I don't have
// a separate first-entry-only PNG). Tap zones are conditionally wired — when
// the state is "first entry", only the primary CTA fires; the secondary CTA
// is a no-op until visit is marked.
export function Screen606Step1Account() {
  const nav = useNavigation<any>();
  const { step1VisitedSoFi, markStep1Visited } = useDealState();

  const onPrimary = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    markStep1Visited();
    // In production this opens SoFi in browser; here we just keep them on
    // the same screen so they have to tap "I've finished signing up" next.
  };

  const onSecondary = () => {
    if (!step1VisitedSoFi) {
      // Soft-block: gently buzz to indicate they should visit SoFi first.
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('Progress66');
  };

  const zones: TapZone[] = [
    { top: 0.045, left: 0.025, width: 0.16, height: 0.05, onPress: () => nav.goBack(), debugLabel: 'Back' },
    { top: 0.045, left: 0.81, width: 0.16, height: 0.05, onPress: () => {}, debugLabel: '3-dots (menu2 TBD)' },
    { top: 0.355, left: 0.108, width: 0.78, height: 0.062, onPress: onPrimary, debugLabel: 'Click here to start' },
    { top: 0.428, left: 0.108, width: 0.78, height: 0.062, onPress: onSecondary, debugLabel: "I've finished signing up" },
    // Chip + input zones (sticky bottom)
    { top: 0.835, left: 0.04, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
    { top: 0.835, left: 0.36, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
    { top: 0.835, left: 0.66, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
  ];

  return (
    <ScreenContainer
      source={require('../assets/frames/606.png')}
      aspectRatio={393 / 920}
      stickyTopFrac={0.13}
      stickyBottomFrac={0.82}
      scrollEnabled={false}
      zones={zones}
    />
  );
}
