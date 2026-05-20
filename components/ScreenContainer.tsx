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
   * If set, the bottom region of the image (from this Y fraction down) renders
   * as a fixed overlay anchored to the device bottom edge — chat input chrome
   * stays visible without scrolling. The same image is rendered twice: once
   * in the scrollable area and once clipped as the bottom overlay.
   */
  fixedBottomFrac?: number;
  /** For consistency with old API — ignored in this rewrite. */
  stickyTopFrac?: number;
  stickyBottomFrac?: number;
};

/**
 * Simple, predictable layout:
 *
 *   ┌────────────────────────────┐
 *   │ ScrollView                 │ image at natural width × imgH,
 *   │  ┌──────────────────────┐  │ Pressables overlay at absolute coords.
 *   │  │ Image (full)         │  │
 *   │  │ Pressables (zones)   │  │
 *   │  └──────────────────────┘  │
 *   └────────────────────────────┘
 *   ┌────────────────────────────┐
 *   │ Fixed bottom overlay       │ same image clipped to bottom slice
 *   └────────────────────────────┘ + zones whose frame-y >= fixedBottomFrac
 *
 * Zones with `top + height <= fixedBottomFrac` render INSIDE the ScrollView
 * (scroll with the image). Zones at or below `fixedBottomFrac` render INSIDE
 * the fixed bottom overlay (stay visible at all times).
 */
export function ScreenContainer({
  source,
  aspectRatio = 393 / 920,
  zones = [],
  overlay,
  debug = false,
  scrollEnabled = true,
  fixedBottomFrac = 1,
}: ScreenContainerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const frameWidth = screenWidth;
  const imgH = frameWidth / aspectRatio;
  const bottomH = (1 - fixedBottomFrac) * imgH;
  const hasFixedBottom = fixedBottomFrac < 1;

  const scrollZones = zones.filter((z) => z.top + z.height <= fixedBottomFrac + 0.001);
  const fixedZones = zones.filter((z) => z.top >= fixedBottomFrac - 0.001);

  const Zone = ({ z, basisTop }: { z: TapZone; basisTop: number }) => (
    <Pressable
      onPress={() => z.onPress()}
      hitSlop={4}
      style={[
        {
          position: 'absolute',
          top: (z.top - basisTop) * imgH,
          left: z.left * frameWidth,
          width: z.width * frameWidth,
          height: z.height * imgH,
          zIndex: 100,
        },
        debug && styles.zoneDebug,
      ]}
      accessibilityLabel={z.debugLabel}
    />
  );

  return (
    <View style={styles.root}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...({ delaysContentTouches: false, contentInsetAdjustmentBehavior: 'never' } as any)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: hasFixedBottom ? bottomH : 0 }}
      >
        <View style={{ width: frameWidth, height: imgH }} pointerEvents="box-none">
          <Image
            source={source}
            style={{ width: frameWidth, height: imgH }}
            resizeMode="cover"
          />
          {scrollZones.map((z, i) => (
            <Zone key={`s-${i}`} z={z} basisTop={0} />
          ))}
        </View>
      </ScrollView>

      {hasFixedBottom && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: bottomH,
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
          pointerEvents="box-none"
        >
          <Image
            source={source}
            style={{
              width: frameWidth,
              height: imgH,
              position: 'absolute',
              top: -(fixedBottomFrac * imgH),
            }}
            resizeMode="cover"
          />
          {fixedZones.map((z, i) => (
            <Zone key={`f-${i}`} z={z} basisTop={fixedBottomFrac} />
          ))}
        </View>
      )}

      {overlay}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  zoneDebug: {
    backgroundColor: 'rgba(255, 235, 59, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.7)',
  },
});
