import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 609 — 100% Deal completed celebration.
// "Claim rewards" → 610.
export function Screen609Completion() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/609.png')}
      aspectRatio={393 / 931}
      zones={[
        { top: 0.918, left: 0.108, width: 0.78, height: 0.067,
          onPress: () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); nav.navigate('RewardsTabA'); },
          debugLabel: 'Claim rewards' },
      ]}
    />
  );
}
