import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 641 v2 — same frame as Screen641Verifying but in the post-bounty state where
// the "Earn while you wait" primary CTA is visible. Tap CTA → 647.
export function Screen641VerifyingWithCta() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/641.png')}
      aspectRatio={393 / 920}
      stickyTopFrac={0.13}
      stickyBottomFrac={0.82}
      scrollEnabled={false}
      zones={[
        { top: 0.490, left: 0.108, width: 0.78, height: 0.062,
          onPress: () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); nav.navigate('VerifyComplete'); },
          debugLabel: 'Earn while you wait' },
        { top: 0.066, left: 0.025, width: 0.16, height: 0.055, onPress: () => nav.goBack(), debugLabel: 'Back' },
      ]}
    />
  );
}
