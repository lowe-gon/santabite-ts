import '@/global.css';
import useSplashScreen from '@/hooks/use-splash-screen';
import AppProvider from '@/providers';
import { useAuthStore } from '@/store/auth-store';

export default function RootLayout() {
  const { fontLoaded } = useSplashScreen();

  if (!fontLoaded) return null;

  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

import { Stack } from 'expo-router';

function MainLayout() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
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
