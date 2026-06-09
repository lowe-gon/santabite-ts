import HapticPressable from '@/components/haptic-pressable';
import useThemeColor from '@/hooks/use-theme-color';
import { FontAwesome } from '@expo/vector-icons';

export default function FacebookButton() {
  const text = useThemeColor('text');

  return (
    <HapticPressable
      label="Continue with Facebook"
      className="bg-surface"
      iconLeft={<FontAwesome name="facebook" size={24} color={text} />}
      textColor="text-black dark:text-white"
    />
  );
}
