export const COLORS = {
  dark: {
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    textMuted: "#9298a1",
  },
  light: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#000000",
    textMuted: "#6d6d6d",
  },
};

export type ThemeColor = keyof typeof COLORS.light & keyof typeof COLORS.dark;

export const FONTS = {
  Righteous_Regular: "Righteous-Regular",
  Oufit_Thin: "Outfit-Thin",
  Oufit_ExtraLight: "Outfit-ExtraLight",
  Oufit_Light: "Outfit-Light",
  Oufit_Regular: "Outfit-Regular",
  Oufit_Medium: "Outfit-Medium",
  Oufit_SemiBold: "Outfit-SemiBold",
  Oufit_Bold: "Outfit-Bold",
  Oufit_ExtraBold: "Outfit-ExtraBold",
  Oufit_ExtraLarge: "Outfit-Black",
};
