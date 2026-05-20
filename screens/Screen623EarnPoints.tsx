import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 623 — "We added your points" + invite-athletes-for-bounty list.
// Real behavior: tap an athlete → bounty flow (out of scope here, just bounces back to
// 641 in the VerifyingWithCta state per Elias).
export function Screen623EarnPoints() {
  const nav = useNavigation<any>();
  const tapAthlete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Simulates the bounty side-quest completing and dropping back to 641 with CTA.
    nav.navigate('VerifyingWithCta');
  };
  return (
    <ScreenContainer
      source={require('../assets/frames/623.png')}
      aspectRatio={393 / 920}
      zones={[
        // Close X — sheet top-right
        { top: 0.595, left: 0.78, width: 0.20, height: 0.06, onPress: () => nav.navigate('VerifyingWithCta'), debugLabel: 'Close → back to Verifying' },
        // Get 200 — Courtney
        { top: 0.755, left: 0.55, width: 0.27, height: 0.04, onPress: tapAthlete, debugLabel: 'Get 200 Courtney' },
        // Get 200 — Leslie
        { top: 0.815, left: 0.55, width: 0.27, height: 0.04, onPress: tapAthlete, debugLabel: 'Get 200 Leslie' },
        // Get 200 — Robert
        { top: 0.875, left: 0.55, width: 0.27, height: 0.04, onPress: tapAthlete, debugLabel: 'Get 200 Robert' },
      ]}
    />
  );
}
