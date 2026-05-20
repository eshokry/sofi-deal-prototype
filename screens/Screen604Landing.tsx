import React from 'react';
import { View, PanResponder, useWindowDimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 604 — Landing. Two valid interactions:
//   1. TAP "Start the deal" button (on the deal card) → directly accepts the
//      deal and advances to 605 Progress 33%.
//   2. SWIPE the deal card sideways before accepting → 597 modal warns + offers
//      its own Start-the-deal CTA.
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
      onPanResponderGrant: () => {},
      onPanResponderRelease: (_, g) => {
        if (Math.abs(g.dx) > 40) {
          fireStartModal();
        }
      },
    }),
  ).current;

  // Swipe-capture overlay positioned over the card title + pills area only,
  // NOT covering the Start the deal button (so taps on it still register).
  // Card extends from y=0.13 to y=0.54 of frame (above the button at y=0.55).
  const swipeOverlay = (
    <View
      style={[
        styles.swipe,
        {
          top: frameHeight * 0.13,
          height: frameHeight * 0.41,
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
      overlay={swipeOverlay}
      stickyTopFrac={0.135}
      stickyBottomFrac={0.78}
      scrollEnabled={false}
      zones={[
        // Start the deal — primary CTA on the deal card
        {
          top: 0.547, left: 0.075, width: 0.85, height: 0.062,
          onPress: acceptDeal,
          debugLabel: 'Start the deal → 605',
        },
        // 3-dots top-right — menu1 modal (next commit)
        { top: 0.045, left: 0.81, width: 0.16, height: 0.05, onPress: () => {}, debugLabel: '3-dots (menu1 TBD)' },
        // Back arrow
        { top: 0.045, left: 0.025, width: 0.16, height: 0.05, onPress: () => nav.goBack(), debugLabel: 'Back' },
        // Suggested chips
        { top: 0.795, left: 0.04, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
        { top: 0.795, left: 0.36, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
        { top: 0.795, left: 0.66, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
        // Terms link bottom
        { top: 0.94, left: 0.20, width: 0.70, height: 0.04, onPress: () => {}, debugLabel: 'Terms (TBD)' },
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
