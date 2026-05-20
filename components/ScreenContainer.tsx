import React from 'react';
import { View, Image, ImageSourcePropType, Pressable, StyleSheet, useWindowDimensions } from 'react-native';

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
  /** Optional debug label rendered as semi-transparent fill. */
  debugLabel?: string;
};

export type ScreenContainerProps = {
  source: ImageSourcePropType;
  /** Source PNG aspect ratio (width / height). Most SoFi frames are 393 / variable. */
  aspectRatio?: number;
  zones?: TapZone[];
  /** If true, renders translucent yellow overlays on each zone so you can visually verify tap regions. */
  debug?: boolean;
};

/**
 * Renders a full-screen frame PNG with absolute-positioned tap zones overlaid on top.
 * The image scales to fit the device width; the screen vertically fills if shorter than device.
 */
export function ScreenContainer({
  source,
  aspectRatio = 393 / 920,
  zones = [],
  debug = false,
}: ScreenContainerProps) {
  const { width: screenWidth } = useWindowDimensions();
  // Compute the rendered frame width/height after fitting to the device.
  const frameWidth = screenWidth;
  const frameHeight = frameWidth / aspectRatio;

  return (
    <View style={styles.root}>
      <Image
        source={source}
        style={{ width: frameWidth, height: frameHeight, resizeMode: 'cover' }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
