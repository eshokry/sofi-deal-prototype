import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 614 — "Just a few final details..." transition animation screen.
// Auto-fires forward to Completion (609).
export function Screen614Transition() {
  const nav = useNavigation<any>();
  useEffect(() => {
    const t = setTimeout(() => nav.navigate('Completion'), 1600);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <ScreenContainer
      source={require('../assets/frames/614.png')}
      aspectRatio={393 / 920}
      zones={[
        { top: 0.0, left: 0.0, width: 1.0, height: 1.0,
          onPress: () => nav.navigate('Completion'), debugLabel: 'Tap or auto in 1.6s' },
      ]}
    />
  );
}
