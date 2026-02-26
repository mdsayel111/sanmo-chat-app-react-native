import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/auth-context';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(protected)',
};

export default function RootLayout() {
  const [guard, setGuard] = useState(false);
  // const { auth } = AsyncStorage.getItem("auth");
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#0f3d33" />
      <ThemeProvider value={DefaultTheme} >
        <GestureHandlerRootView>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* <Stack.Protected guard={auth?.token ? true : false}> */}
            <Stack.Screen name="(protected)" />
            {/* </Stack.Protected> */}
            <Stack.Screen name="auth" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
