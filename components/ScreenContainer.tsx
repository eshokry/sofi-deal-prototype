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
  top: number;
  left: number;
  width: number;
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
  /**
   * Fractional Y in frame coords where the sticky top region ends.
   * Default 0 = no sticky top. Common: 0.13 (covers iOS status bar + top nav).
   */
  stickyTopFrac?: number;
  /**
   * Fractional Y in frame coords where the sticky bottom region starts.
   * Default 1 = no sticky bottom. Common: 0.78 (covers chips + input + terms).
   */
  stickyBottomFrac?: number;
};

/**
 * Renders a Figma frame PNG with optional sticky top/bottom regions so that
 * status bar + top nav stay fixed at the device top edge and chat input +
 * terms stay fixed at the bottom, while the middle (e.g. deal card) scrolls.
 * Matches the production app's layout pattern.
 *
 * The full-resolution PNG is rendered into three overflow:hidden viewports,
 * each offsetting the same Image so only the desired Y band is visible.
 */
export function ScreenContainer({
  source,
  aspectRatio = 393 / 920,
  zones = [],
  overlay,
  debug = false,
  scrollEnabled = true,
  stickyTopFrac = 0,
  stickyBottomFrac = 1,
}: ScreenContainerProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const frameWidth = screenWidth;
  const fullFrameHeight = frameWidth / aspectRatio;

  // Sticky-section heights in screen pt.
  const stickyTopH = stickyTopFrac * fullFrameHeight;
  const stickyBottomH = (1 - stickyBottomFrac) * fullFrameHeight;
  const middleAvailable = screenHeight - stickyTopH - stickyBottomH;
  const middleContentH = (stickyBottomFrac - stickyTopFrac) * fullFrameHeight;

  // Helper to categorize zones by which region they belong in.
  const topZones = zones.filter((z) => z.top + z.height <= stickyTopFrac + 0.001);
  const bottomZones = zones.filter((z) => z.top >= stickyBottomFrac - 0.001);
  const middleZones = zones.filter(
    (z) => z.top > stickyTopFrac - 0.001 && z.top < stickyBottomFrac - 0.001
      && !(z.top + z.height <= stickyTopFrac + 0.001),
  );

  const renderZone = (z: TapZone, i: number, basisTop: number) => (
    <Pressable
      key={i}
      onPress={() => z.onPress()}
      hitSlop={4}
      pointerEvents="auto"
      style={[
        styles.zone,
        {
          top: (z.top - basisTop) * fullFrameHeight,
          left: z.left * frameWidth,
          width: z.width * frameWidth,
          height: z.height * fullFrameHeight,
        },
        debug && styles.zoneDebug,
      ]}
      accessibilityLabel={z.debugLabel}
    />
  );

  return (
    <View style={styles.root}>
      {/* Middle scrollable region (rendered first so sticky regions overlay) */}
      <ScrollView
        style={{ position: 'absolute', top: stickyTopH, left: 0, right: 0, bottom: stickyBottomH }}
        scrollEnabled={scrollEnabled && middleContentH > middleAvailable}
        bounces={middleContentH > middleAvailable}
        showsVerticalScrollIndicator={false}
        {...({ delaysContentTouches: false, contentInsetAdjustmentBehavior: 'never' } as any)}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{ width: frameWidth, height: middleContentH, overflow: 'hidden' }}
          pointerEvents="box-none"
        >
          <View style={{ width: frameWidth, height: fullFrameHeight, position: 'absolute', top: -stickyTopH }} pointerEvents="none">
            <Image
              source={source}
              style={{ width: frameWidth, height: fullFrameHeight }}
              resizeMode="contain"
            />
          </View>
          {middleZones.map((z, i) => renderZone(z, i, stickyTopFrac))}
        </View>
      </ScrollView>

      {/* Sticky top region */}
      {stickyTopFrac > 0 && (
        <View
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: stickyTopH, overflow: 'hidden' }}
          pointerEvents="box-none"
        >
          <View style={{ width: frameWidth, height: fullFrameHeight, position: 'absolute', top: 0 }} pointerEvents="none">
            <Image
              source={source}
              style={{ width: frameWidth, height: fullFrameHeight }}
              resizeMode="contain"
            />
          </View>
          {topZones.map((z, i) => renderZone(z, i, 0))}
        </View>
      )}

      {/* Sticky bottom region */}
      {stickyBottomFrac < 1 && (
        <View
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: stickyBottomH, overflow: 'hidden' }}
          pointerEvents="box-none"
        >
          <View style={{ width: frameWidth, height: fullFrameHeight, position: 'absolute', top: -(stickyBottomFrac * fullFrameHeight) }} pointerEvents="none">
            <Image
              source={source}
              style={{ width: frameWidth, height: fullFrameHeight }}
              resizeMode="contain"
            />
          </View>
          {bottomZones.map((z, i) => renderZone(z, i, stickyBottomFrac))}
        </View>
      )}

      {overlay}
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
