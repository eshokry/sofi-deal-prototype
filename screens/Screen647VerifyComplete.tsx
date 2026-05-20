import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 647 — "Earn points while you wait" sheet (similar to 623 but next-step in flow).
// Real behavior: once SoFi+NIL Club sign-up confirmed → 614 animation auto-fires.
// V2: tap close OR auto-advance after 1.5s.
export function Screen647VerifyComplete() {
  const nav = useNavigation<any>();

  useEffect(() => {
    const t = setTimeout(() => nav.navigate('Transition'), 1800);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <ScreenContainer
      source={require('../assets/frames/647.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.620, left: 0.81, width: 0.15, height: 0.04, onPress: () => nav.navigate('Transition'), debugLabel: 'Close → Transition' },
        { top: 0.0, left: 0.0, width: 1.0, height: 0.6,
          onPress: () => nav.navigate('Transition'), debugLabel: 'Tap top (auto 1.8s)' },
      ]}
    />
  );
}
