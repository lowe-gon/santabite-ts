import useFontScheme from '@/hooks/use-font-scheme';
import AppProvider from '@/provider';
import { useAuth } from '@clerk/expo';
import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  const fontLoaded = useFontScheme();

  if (!fontLoaded) return null;

  return (
    <AppProvider>
      <RootNavigationLayout />
    </AppProvider>
  );
}

function RootNavigationLayout() {
  const { isSignedIn } = useAuth();

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
      <Stack.Protected guard={!!isSignedIn}>
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
