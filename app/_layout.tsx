import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/auth-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme} >
        <GestureHandlerRootView>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Protected guard={false}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>
            <Stack.Screen name="auth" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
