import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 622 — Partial reward bottom-sheet: "Great job so far / Claim 50".
// Real behavior: 1.5s auto-fire from 641; "Claim" → 623.
export function Screen622PartialReward() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/622.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.890, left: 0.108, width: 0.78, height: 0.060,
          onPress: () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); nav.navigate('EarnPoints'); },
          debugLabel: 'Claim 50' },
        // Close X on bottom sheet
        { top: 0.700, left: 0.81, width: 0.15, height: 0.04, onPress: () => nav.goBack(), debugLabel: 'Close sheet' },
      ]}
    />
  );
}
