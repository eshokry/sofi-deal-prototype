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
  /** Y fraction (0-1) where the sticky top region ends. Default 0 = none. */
  stickyTopFrac?: number;
  /** Y fraction (0-1) where the sticky bottom region starts. Default 1 = none. */
  stickyBottomFrac?: number;
};

/**
 * Flexbox-based ScreenContainer:
 *   ┌──────────────────────────────┐
 *   │ Sticky Top  (overflow:hidden)│ fixed height = stickyTopFrac * imgH
 *   ├──────────────────────────────┤
 *   │ Middle (flex:1, scrollable)  │ fills remaining viewport
 *   ├──────────────────────────────┤
 *   │ Sticky Bottom (overflow:hidd)│ fixed height = (1-stickyBottomFrac) * imgH
 *   └──────────────────────────────┘
 *
 * Each section renders the full PNG offset so only its slice shows. Pressables
 * are absolutely positioned inside each section. Image is wrapped in a
 * pointerEvents=none View so it never captures touches.
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
  const { width: screenWidth } = useWindowDimensions();
  const frameWidth = screenWidth;
  const imgH = frameWidth / aspectRatio;
  const topH = stickyTopFrac * imgH;
  const bottomH = (1 - stickyBottomFrac) * imgH;
  const middleContentH = (stickyBottomFrac - stickyTopFrac) * imgH;

  const inTop = (z: TapZone) => z.top + z.height <= stickyTopFrac + 0.001;
  const inBottom = (z: TapZone) => z.top >= stickyBottomFrac - 0.001;
  const inMiddle = (z: TapZone) => !inTop(z) && !inBottom(z);

  const renderZone = (z: TapZone, i: number, basisTop: number) => (
    <Pressable
      key={`z-${i}-${z.debugLabel ?? ''}`}
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

  const ImgSlice = ({ topOffset }: { topOffset: number }) => (
    <View
      style={{ position: 'absolute', top: topOffset, left: 0, width: frameWidth, height: imgH }}
      pointerEvents="none"
    >
      <Image
        source={source}
        style={{ width: frameWidth, height: imgH }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.root}>
      {/* Sticky top */}
      {stickyTopFrac > 0 && (
        <View style={{ height: topH, overflow: 'hidden' }} pointerEvents="box-none">
          <ImgSlice topOffset={0} />
          {zones.filter(inTop).map((z, i) => renderZone(z, i, 0))}
        </View>
      )}

      {/* Middle */}
      <View style={{ flex: 1, overflow: 'hidden' }} pointerEvents="box-none">
        <ScrollView
          scrollEnabled={scrollEnabled && middleContentH > 0}
          bounces={false}
          showsVerticalScrollIndicator={false}
          {...({ delaysContentTouches: false, contentInsetAdjustmentBehavior: 'never' } as any)}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
          contentContainerStyle={{ height: middleContentH }}
        >
          <View
            style={{ width: frameWidth, height: middleContentH, position: 'relative' }}
            pointerEvents="box-none"
          >
            <ImgSlice topOffset={-topH} />
            {zones.filter(inMiddle).map((z, i) => renderZone(z, i, stickyTopFrac))}
          </View>
        </ScrollView>
      </View>

      {/* Sticky bottom */}
      {stickyBottomFrac < 1 && (
        <View style={{ height: bottomH, overflow: 'hidden' }} pointerEvents="box-none">
          <ImgSlice topOffset={-(stickyBottomFrac * imgH)} />
          {zones.filter(inBottom).map((z, i) => renderZone(z, i, stickyBottomFrac))}
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
