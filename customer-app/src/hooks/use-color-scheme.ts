import { useUniwind } from 'uniwind';

export default function useColorScheme() {
  const { theme } = useUniwind();

  return theme;
}
