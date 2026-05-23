import {
  useFonts,
  Outfit_100Thin,
  Outfit_300Light,
  Outfit_200ExtraLight,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  Outfit_900Black,
} from '@expo-google-fonts/outfit';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function useFontScheme() {
  let [fontsLoaded] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });

  React.useEffect(() => {
    (async () => {
      if (!fontsLoaded) return;
      SplashScreen.hideAsync();
    })();
  }, [fontsLoaded]);

  return fontsLoaded;
}
