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
  aspectRatio?: number;
  zones?: TapZone[];
  overlay?: React.ReactNode;
  debug?: boolean;
  scrollEnabled?: boolean;
};

/**
 * Renders a Figma frame PNG edge-to-edge by ignoring safe-area insets (the PNG
 * includes its own drawn iOS chrome — 9:41 status bar, dynamic island, signal —
 * so the PNG IS the chrome). Tap zones are absolute-positioned over the image
 * inside a ScrollView so vertical scrolling reaches bottom content (e.g. the
 * Terms link on 604 which sits below the typical iPhone viewport fold).
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
  const frameWidth = screenWidth;
  const frameHeight = frameWidth / aspectRatio;

  return (
    <View style={styles.root}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        bounces
        showsVerticalScrollIndicator={false}
        {...({ delaysContentTouches: false } as any)}
        keyboardShouldPersistTaps="handled"
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
