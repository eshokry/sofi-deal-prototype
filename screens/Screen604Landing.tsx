import React from 'react';
import { View, PanResponder, useWindowDimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '../components/ScreenContainer';

// Frame 604 — Landing. The deal card area accepts a horizontal swipe gesture.
// Real behavior: swiping the card sideways before accepting fires the 597 Start modal.
export function Screen604Landing() {
  const nav = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  // Compute frameHeight to mirror ScreenContainer's contain layout.
  const aspectRatio = 393 / 1008;
  const frameHeight = screenWidth / aspectRatio;

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

  // Overlay: an invisible swipe-capture View positioned over the deal card area.
  // Card area is roughly y=0.13–0.53 (after status bar + top nav + before chips row).
  const swipeOverlay = (
    <View
      style={[
        styles.swipe,
        {
          top: frameHeight * 0.13,
          height: frameHeight * 0.40,
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
      zones={[
        // 3-dots top-right — menu1 modal (next commit)
        { top: 0.06, left: 0.81, width: 0.16, height: 0.05, onPress: () => {}, debugLabel: '3-dots (menu1 TBD)' },
        // Back arrow
        { top: 0.06, left: 0.025, width: 0.16, height: 0.05, onPress: () => nav.goBack(), debugLabel: 'Back' },
        // Suggested chips (601/602/603 TBD)
        { top: 0.75, left: 0.04, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 1 (TBD)' },
        { top: 0.75, left: 0.36, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 2 (TBD)' },
        { top: 0.75, left: 0.66, width: 0.30, height: 0.07, onPress: () => {}, debugLabel: 'Chip 3 (TBD)' },
        // Terms link bottom
        { top: 0.95, left: 0.30, width: 0.50, height: 0.04, onPress: () => {}, debugLabel: 'Terms (TBD)' },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  swipe: {
    position: 'absolute',
    left: 0,
    // backgroundColor: 'rgba(255,0,0,0.1)', // uncomment to visualize
  },
});
