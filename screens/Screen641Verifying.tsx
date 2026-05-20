import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 641 — "Verifying sign up with SoFi" — Pending state.
// Real behavior: 1.5s auto-transition to 622 (Great job so far modal).
// V2 simplification: tap anywhere advances; also auto-fires after 1.5s on mount.
export function Screen641Verifying() {
  const nav = useNavigation<any>();

  useEffect(() => {
    const t = setTimeout(() => {
      nav.navigate('PartialReward');
    }, 1500);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <ScreenContainer
      source={require('../assets/frames/641.png')}
      aspectRatio={393 / 920}
      stickyTopFrac={0.13}
      stickyBottomFrac={0.82}
      scrollEnabled={false}
      zones={[
        { top: 0.0, left: 0.0, width: 1.0, height: 1.0,
          onPress: () => nav.navigate('PartialReward'),
          debugLabel: 'Tap anywhere — also auto in 1.5s' },
        { top: 0.066, left: 0.025, width: 0.16, height: 0.055, onPress: () => nav.goBack(), debugLabel: 'Back' },
      ]}
    />
  );
}
