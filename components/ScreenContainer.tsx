import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TapZone = {
  /** Top edge as a fraction of the frame height (0-1). */
  top: number;
  /** Left edge as a fraction of the frame width (0-1). */
  left: number;
  /** Width as a fraction of the frame width (0-1). */
  width: number;
  /** Height as a fraction of the frame height (0-1). */
  height: number;
  onPress: () => void;
  debugLabel?: string;
};

export type ScreenContainerProps = {
  source: ImageSourcePropType;
  /** Source PNG aspect ratio (width / height). */
  aspectRatio?: number;
  zones?: TapZone[];
  /** Optional Gesture component (e.g. swipe handler) rendered over the image. */
  overlay?: React.ReactNode;
  /** If true, render translucent yellow on each zone for debugging. */
  debug?: boolean;
  /** If false, lock vertical scroll (useful for celebration screens that fit). */
  scrollEnabled?: boolean;
};

/**
 * Renders a Figma frame PNG fitting the device width, wrapped in a ScrollView so
 * tall frames (the SoFi flow ranges 880-1008px tall) can scroll to expose buttons
 * at the bottom on shorter devices. Tap zones use absolute positioning inside the
 * scroll content so they scroll together with the image.
 */
export function ScreenContainer({
  source,
  aspectRatio = 393 / 920,
  zones = [],
  overlay,
  debug = false,
  scrollEnabled = true,
}: ScreenContainerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const frameWidth = screenWidth;
  const frameHeight = frameWidth / aspectRatio;

  return (
    <View style={[styles.root, { marginTop: -insets.top }]}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        bounces={false}
        showsVerticalScrollIndicator={false}
        // iOS-only: makes Pressable children respond instantly without waiting for
        // ScrollView's tap-vs-scroll disambiguation. Type def is stale; cast via spread.
        {...({ delaysContentTouches: false } as any)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <View style={{ width: frameWidth, height: frameHeight }}>
          <Image
            source={source}
            style={{ width: frameWidth, height: frameHeight }}
            resizeMode="contain"
          />
          {zones.map((z, i) => (
            <Pressable
              key={i}
              onPress={z.onPress}
              style={[
                styles.zone,
                {
                  top: z.top * frameHeight,
                  left: z.left * frameWidth,
                  width: z.width * frameWidth,
                  height: z.height * frameHeight,
                },
                debug && styles.zoneDebug,
              ]}
              accessibilityLabel={z.debugLabel}
            />
          ))}
          {overlay}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  zone: {
    position: 'absolute',
  },
  zoneDebug: {
    backgroundColor: 'rgba(255, 235, 59, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.7)',
  },
});
