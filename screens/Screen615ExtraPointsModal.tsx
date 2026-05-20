import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Share } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 615 — "Want 100 extra points?" modal.
// Real behavior: Accept ("Send to team group chat") → native bottom sheet share fires.
// Decline → 616 final state.
export function Screen615ExtraPointsModal() {
  const nav = useNavigation<any>();

  const onAccept = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      await Share.share({
        message: 'Just finished the SoFi deal on NIL Club — get $20 + 900 pts when you sign up: https://nilclub.com/deal/sofi',
      });
    } catch {}
    // After share dismissal, settle to 616 final.
    nav.navigate('Final');
  };

  const onDecline = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('Final');
  };

  return (
    <ScreenContainer
      source={require('../assets/frames/615.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.555, left: 0.108, width: 0.78, height: 0.060, onPress: onAccept, debugLabel: 'Send to team group chat' },
        { top: 0.625, left: 0.108, width: 0.78, height: 0.060, onPress: onDecline, debugLabel: 'Decline 100 points' },
      ]}
    />
  );
}
