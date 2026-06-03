import '@/global.css';
import useAppState from '@/hooks/use-app-state';
import useSplashScreen from '@/hooks/use-splash-screen';
import AppProvider from '@/providers/app-provider';
import { useAuthStore } from '@/store/auth-store';

import { Stack } from 'expo-router';

export default function RootLayout() {
  const { fontsLoaded } = useSplashScreen();

  // Check if the app is inactive
  useAppState();

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <RootNavigationsLayout />
    </AppProvider>
  );
}

function RootNavigationsLayout() {
  const isGuest = useAuthStore((state) => state.isGuest);
  const isLoggedIn = false;

  return (
    <Stack>
      <Stack.Protected guard={!isGuest && !isLoggedIn}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isGuest || isLoggedIn}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
