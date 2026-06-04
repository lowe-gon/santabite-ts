import { Colors } from '@/constants/theme';
import { useUniwind } from 'uniwind';

export default function useTheme() {
  const { theme } = useUniwind();

  return Colors[theme];
}
