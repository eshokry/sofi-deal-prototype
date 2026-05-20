import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';

import { Screen604Landing } from '../screens/Screen604Landing';
import { Screen597StartModal } from '../screens/Screen597StartModal';
import { Screen605Progress33 } from '../screens/Screen605Progress33';
import { Screen606Step1Account } from '../screens/Screen606Step1Account';
import { Screen607Progress66 } from '../screens/Screen607Progress66';
import { Screen608Step2Deposit } from '../screens/Screen608Step2Deposit';
import { Screen641Verifying } from '../screens/Screen641Verifying';
import { Screen622PartialReward } from '../screens/Screen622PartialReward';
import { Screen623EarnPoints } from '../screens/Screen623EarnPoints';
import { Screen641VerifyingWithCta } from '../screens/Screen641VerifyingWithCta';
import { Screen647VerifyComplete } from '../screens/Screen647VerifyComplete';
import { Screen614Transition } from '../screens/Screen614Transition';
import { Screen609Completion } from '../screens/Screen609Completion';
import { Screen610RewardsTabA } from '../screens/Screen610RewardsTabA';
import { Screen611RewardsTabB } from '../screens/Screen611RewardsTabB';
import { Screen761NILRewardsInfo } from '../screens/Screen761NILRewardsInfo';
import { Screen762SoFiRewardsInfo } from '../screens/Screen762SoFiRewardsInfo';
import { Screen615ExtraPointsModal } from '../screens/Screen615ExtraPointsModal';
import { Screen616Final } from '../screens/Screen616Final';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="Landing" component={Screen604Landing} />
        <Stack.Screen name="StartModal" component={Screen597StartModal}
          options={{ presentation: 'transparentModal', animation: 'fade' }} />
        <Stack.Screen name="Progress33" component={Screen605Progress33}
          options={{ animation: 'fade' }} />
        <Stack.Screen name="Step1Account" component={Screen606Step1Account} />
        <Stack.Screen name="Progress66" component={Screen607Progress66}
          options={{ animation: 'fade' }} />
        <Stack.Screen name="Step2Deposit" component={Screen608Step2Deposit} />
        <Stack.Screen name="Verifying" component={Screen641Verifying} />
        <Stack.Screen name="PartialReward" component={Screen622PartialReward}
          options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="EarnPoints" component={Screen623EarnPoints}
          options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="VerifyingWithCta" component={Screen641VerifyingWithCta} />
        <Stack.Screen name="VerifyComplete" component={Screen647VerifyComplete}
          options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Transition" component={Screen614Transition}
          options={{ animation: 'fade' }} />
        <Stack.Screen name="Completion" component={Screen609Completion}
          options={{ animation: 'fade' }} />
        <Stack.Screen name="RewardsTabA" component={Screen610RewardsTabA}
          options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="RewardsTabB" component={Screen611RewardsTabB} />
        <Stack.Screen name="NILRewardsInfo" component={Screen761NILRewardsInfo}
          options={{ presentation: 'transparentModal', animation: 'fade' }} />
        <Stack.Screen name="SoFiRewardsInfo" component={Screen762SoFiRewardsInfo}
          options={{ presentation: 'transparentModal', animation: 'fade' }} />
        <Stack.Screen name="ExtraPointsModal" component={Screen615ExtraPointsModal}
          options={{ presentation: 'transparentModal', animation: 'fade' }} />
        <Stack.Screen name="Final" component={Screen616Final} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
