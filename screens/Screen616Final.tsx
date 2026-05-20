import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 616 — Final state: Deal completed (Finished 3 days ago).
export function Screen616Final() {
  const nav = useNavigation<any>();
  return (
    <ScreenContainer
      source={require('../assets/frames/616.png')}
      aspectRatio={393 / 920}
      zones={[
        // Back
        { top: 0.066, left: 0.025, width: 0.16, height: 0.055, onPress: () => nav.popToTop(), debugLabel: 'Back to Landing' },
        // 3-dots — would open menu2 (TBD)
        { top: 0.066, left: 0.81, width: 0.16, height: 0.05, onPress: () => {}, debugLabel: '3-dots (menu2 TBD)' },
      ]}
    />
  );
}
