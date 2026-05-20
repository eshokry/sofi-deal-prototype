import React from 'react';
import { StatusBar as RNStatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation/RootNavigator';
import { DealStateProvider } from './state/DealState';

export default function App() {
  RNStatusBar.setHidden(true, 'fade');

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <SafeAreaProvider>
        <StatusBar style="dark" hidden translucent />
        <DealStateProvider>
          <View style={{ flex: 1 }}>
            <RootNavigator />
          </View>
        </DealStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
