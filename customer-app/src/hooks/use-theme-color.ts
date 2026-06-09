import { COLORS, type ThemeColor } from "@/constants/theme";
import { useUniwind } from "uniwind";

export default function useThemeColor(colorName: ThemeColor) {
  const { theme } = useUniwind();

  return COLORS[theme][colorName];
}
