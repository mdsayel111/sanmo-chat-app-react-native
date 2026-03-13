import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/auth-context';
import { SocketProvider } from '@/context/socket-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(protected)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Children />
      </SocketProvider>
    </AuthProvider>
  );
}

const Children = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} >
        <StatusBar style="light" backgroundColor="#0f3d33" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
