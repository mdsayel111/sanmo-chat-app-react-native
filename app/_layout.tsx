import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/auth-context';
import { useSocket } from '@/hooks/useSocket';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(protected)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Children />
    </AuthProvider>
  );
}

const Children = () => {
  useSocket();
  return (<SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar style="light" backgroundColor="#0f3d33" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(protected)/settings" />
          <Stack.Screen name="(protected)/my-profile" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  </SafeAreaProvider>)
}
