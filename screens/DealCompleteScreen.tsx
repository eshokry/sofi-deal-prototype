import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 611 — Final earnings (900 points) + share + next deals.
// Source: 393 × 920.
export function DealCompleteScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer
      source={require('../assets/frames/611.png')}
      aspectRatio={393 / 920}
      zones={[
        // Close (X) — return to deal overview (restart flow)
        {
          top: 0.080, left: 0.81, width: 0.15, height: 0.05,
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.popToTop();
          },
          debugLabel: 'Close',
        },
        // 900 points pill — informational, no nav
        {
          top: 0.072, left: 0.22, width: 0.55, height: 0.05,
          onPress: () => {},
          debugLabel: '900 points',
        },
        // NIL Club rewards info — opens rewards info popup (TBD)
        {
          top: 0.205, left: 0.08, width: 0.50, height: 0.04,
          onPress: () => {},
          debugLabel: 'NIL Club rewards info (TBD)',
        },
        // SoFi rewards info
        {
          top: 0.380, left: 0.08, width: 0.40, height: 0.04,
          onPress: () => {},
          debugLabel: 'SoFi rewards info (TBD)',
        },
        // Share this deal — view all
        {
          top: 0.504, left: 0.72, width: 0.24, height: 0.04,
          onPress: () => {},
          debugLabel: 'View all friends (TBD)',
        },
        // Get 200 — Courtney Henry
        {
          top: 0.590, left: 0.55, width: 0.27, height: 0.04,
          onPress: () => {},
          debugLabel: 'Get 200 Courtney',
        },
        // Get 200 — Leslie Alexander
        {
          top: 0.660, left: 0.55, width: 0.27, height: 0.04,
          onPress: () => {},
          debugLabel: 'Get 200 Leslie',
        },
        // Next deals view all
        {
          top: 0.726, left: 0.72, width: 0.24, height: 0.04,
          onPress: () => {},
          debugLabel: 'View all deals (TBD)',
        },
      ]}
    />
  );
}
