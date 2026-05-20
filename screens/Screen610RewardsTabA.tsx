import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 610 — Rewards tab A: "$20 added to balance" toast + Deal rewards breakdown.
// Real behavior: 1.5s after the tab fires, the 615 "Want 100 extra points?" modal appears.
// V2: auto-fires the 615 modal after 1.5s. Manual taps available too.
export function Screen610RewardsTabA() {
  const nav = useNavigation<any>();

  useEffect(() => {
    const t = setTimeout(() => nav.navigate('ExtraPointsModal'), 1500);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <ScreenContainer
      source={require('../assets/frames/610.png')}
      aspectRatio={393 / 920}
      zones={[
        // Close X
        { top: 0.085, left: 0.81, width: 0.15, height: 0.05,
          onPress: () => nav.popToTop(), debugLabel: 'Close → Landing' },
        // NIL Club rewards info (i icon)
        { top: 0.205, left: 0.40, width: 0.08, height: 0.04,
          onPress: () => nav.navigate('NILRewardsInfo'), debugLabel: 'NIL Club info → 761' },
        // SoFi rewards info (i icon)
        { top: 0.380, left: 0.36, width: 0.08, height: 0.04,
          onPress: () => nav.navigate('SoFiRewardsInfo'), debugLabel: 'SoFi info → 762' },
      ]}
    />
  );
}
