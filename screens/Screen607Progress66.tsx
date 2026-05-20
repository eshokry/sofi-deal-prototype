import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 607 — Progress arc 66%, "You're on fire!".
// Fires after the SoFi account signup step completes (+5 pts).
export function Screen607Progress66() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/607.png')}
      aspectRatio={393 / 931}
      zones={[
        { top: 0.918, left: 0.108, width: 0.78, height: 0.067,
          onPress: () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); nav.navigate('Step2Deposit'); },
          debugLabel: 'Keep going' },
      ]}
    />
  );
}
