import React from 'react';
import { View, PanResponder, useWindowDimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 604 — Landing. Zone positions measured against the 1179×3024 @3x PNG.
export function Screen604Landing() {
  const nav = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  const aspectRatio = 393 / 1008;
  const frameHeight = screenWidth / aspectRatio;

  const acceptDeal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    nav.navigate('Progress33');
  };
  const fireStartModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nav.navigate('StartModal');
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 15 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderRelease: (_, g) => {
        if (Math.abs(g.dx) > 40) fireStartModal();
      },
    }),
  ).current;

  // Card area swipe overlay — between title and button.
  const swipeOverlay = (
    <View
      style={[
        styles.swipe,
        {
          top: frameHeight * 0.135,
          height: frameHeight * 0.54,
          width: screenWidth,
        },
      ]}
      {...panResponder.panHandlers}
    />
  );

  return (
    <ScreenContainer
      source={require('../assets/frames/604.png')}
      aspectRatio={393 / 1008}
      stickyTopFrac={0.135}
      stickyBottomFrac={0.78}
      scrollEnabled={false}
      overlay={swipeOverlay}
      zones={[
        // Back arrow (top nav, left)
        { top: 0.066, left: 0.025, width: 0.18, height: 0.046, onPress: () => nav.goBack(), debugLabel: 'Back' },
        // 3-dots (top nav, right)
        { top: 0.066, left: 0.795, width: 0.18, height: 0.046, onPress: () => {}, debugLabel: '3-dots (menu1 TBD)' },
        // Start the deal — primary CTA on the deal card
        { top: 0.679, left: 0.075, width: 0.85, height: 0.062, onPress: acceptDeal, debugLabel: 'Start the deal' },
        // Suggested chips (within sticky bottom band)
        { top: 0.820, left: 0.04, width: 0.30, height: 0.066, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
        { top: 0.820, left: 0.36, width: 0.30, height: 0.066, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
        { top: 0.820, left: 0.66, width: 0.30, height: 0.066, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
        // Terms link — just the word + arrow at right of footer line
        { top: 0.955, left: 0.65, width: 0.30, height: 0.030, onPress: () => {}, debugLabel: 'Terms (TBD)' },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  swipe: {
    position: 'absolute',
    left: 0,
  },
});
