import React from 'react';
import { StatusBar as RNStatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  // Hide the iOS status bar via the native API in addition to expo-status-bar
  // so the PNG's drawn 9:41 chrome aligns with the device edge instead of competing
  // with the system status bar.
  RNStatusBar.setHidden(true, 'fade');

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaProvider>
        <StatusBar style="dark" hidden translucent />
        <View style={{ flex: 1 }}>
          <RootNavigator />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
