import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';

import { DealOverviewScreen } from '../screens/DealOverviewScreen';
import { Step1SignupScreen } from '../screens/Step1SignupScreen';
import { ProgressInterstitialScreen } from '../screens/ProgressInterstitialScreen';
import { DealStepsListScreen } from '../screens/DealStepsListScreen';
import { DealCompleteScreen } from '../screens/DealCompleteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="DealOverview"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="DealOverview" component={DealOverviewScreen} />
        <Stack.Screen name="Step1Signup" component={Step1SignupScreen} />
        <Stack.Screen
          name="ProgressInterstitial"
          component={ProgressInterstitialScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="DealStepsList"
          component={DealStepsListScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="DealComplete" component={DealCompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
