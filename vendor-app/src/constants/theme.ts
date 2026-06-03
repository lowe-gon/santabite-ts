import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Layout Elements
    background: '#fffff' /* oklch(0.98 0.005 240) */,
    backgroundElement: '#f2f2f2' /* oklch(0.95 0.01 240) */,
    backgroundSelected: '#e1e3e8' /* oklch(0.88 0.02 240) - Matches border token */,
    card: '#ffffff' /* oklch(1 0 0) */,

    // Typography
    text: '#3b3f46' /* oklch(0.25 0.02 240) */,
    textSecondary: '#777c85' /* oklch(0.5 0.02 240) */,

    // Primary Blue
    primary: '#1d5ec2' /* oklch(0.52 0.24 250) */,
    primaryHover: '#134ca4' /* oklch(0.45 0.22 250) */,
    primaryMuted: '#e8effc' /* oklch(0.92 0.04 250) */,

    // Secondary Orange
    secondary: '#cc5200' /* oklch(0.6 0.22 40) */,
    secondaryHover: '#b34100' /* oklch(0.53 0.21 40) */,
    secondaryMuted: '#fdf1e7' /* oklch(0.93 0.04 40) */,
  },
  dark: {
    // Layout Elements (Using your exact 68deg & 256 parameters)
    background: '#2b2a24' /* oklch(17% 0% 68deg) */,
    backgroundElement: '#35342e' /* oklch(21% 0% 68deg) */,
    backgroundSelected: '#2c3449' /* oklch(26% 0.03 256) - Matches border token */,
    card: '#242a39' /* oklch(18.5% 0.026 256) */,

    // Typography
    text: '#eceff4' /* oklch(0.94 0.008 256) */,
    textSecondary: '#bac3d2' /* oklch(0.76 0.015 256) */,

    // Primary Blue
    primary: '#4c92ff' /* oklch(0.68 0.19 248) */,
    primaryHover: '#7faeff' /* oklch(0.74 0.15 248) */,
    primaryMuted: '#232b3f' /* oklch(22% 0.05 248) */,

    // Secondary Orange
    secondary: '#ff983d' /* oklch(0.72 0.16 54) */,
    secondaryHover: '#ffb26e' /* oklch(0.78 0.12 54) */,
    secondaryMuted: '#2e261d' /* oklch(22% 0.04 54) */,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    thin: 'Outfit_100Thi',
    extralight: 'Outfit_200ExtraLight',
    light: 'Outfit_300Light',
    regular: 'Outfit_400Regular',
    medium: 'Outfit_500Medium',
    semibold: 'Outfit_600SemiBold',
    bold: 'Outfit_700Bold',
    extrabold: 'Outfit_800ExtraBold',
    xl: 'Outfit_900Black',
  },
  default: {
    thin: 'Outfit_100Thi',
    extralight: 'Outfit_200ExtraLight',
    light: 'Outfit_300Light',
    regular: 'Outfit_400Regular',
    medium: 'Outfit_500Medium',
    semibold: 'Outfit_600SemiBold',
    bold: 'Outfit_700Bold',
    extrabold: 'Outfit_800ExtraBold',
    xl: 'Outfit_900Black',
  },
  web: {
    thin: 'var(--font-thin)',
    extralight: 'var(--font-extralight)',
    light: 'var(--font-light)',
    regular: 'var(--font-regular)',
    medium: 'var(--font-medium)',
    semibold: 'var(--font-semibold)',
    bold: 'var(--font-bold)',
    extrabold: 'var(--font-extrabold)',
    xl: 'var(--font-xl)',
  },
});
