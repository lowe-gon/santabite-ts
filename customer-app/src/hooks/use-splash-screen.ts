import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function useSplashScreen() {
  const [fontLoaded] = useFonts({
    Righteous_Regular: require("@/assets/fonts/Righteous-Regular.ttf"),
    Oufit_Thin: require("@/assets/fonts/Outfit-Thin.ttf"),
    Oufit_ExtraLight: require("@/assets/fonts/Outfit-ExtraLight.ttf"),
    Oufit_Light: require("@/assets/fonts/Outfit-Light.ttf"),
    Oufit_Regular: require("@/assets/fonts/Outfit-Regular.ttf"),
    Oufit_Medium: require("@/assets/fonts/Outfit-Medium.ttf"),
    Oufit_SemiBold: require("@/assets/fonts/Outfit-SemiBold.ttf"),
    Oufit_Bold: require("@/assets/fonts/Outfit-Bold.ttf"),
    Oufit_ExtraBold: require("@/assets/fonts/Outfit-ExtraBold.ttf"),
    Oufit_ExtraLarge: require("@/assets/fonts/Outfit-Black.ttf"),
  });

  React.useEffect(() => {
    if (!fontLoaded) return;
    SplashScreen.hideAsync();
  }, [fontLoaded]);

  return { fontLoaded };
}
