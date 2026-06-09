import HapticPressable from '@/components/haptic-pressable';
import { COLORS } from '@/constants/theme';
import useColorScheme from '@/hooks/use-color-scheme';
import { AntDesign } from '@expo/vector-icons';

export default function AppleButton() {
  const colorScheme = useColorScheme();

  return (
    <HapticPressable
      label="Continue with Apple"
      className="bg-black dark:bg-white"
      textColor="text-white dark:text-black"
      iconLeft={
        <AntDesign
          name="apple"
          size={24}
          color={colorScheme === 'dark' ? COLORS.light.text : COLORS.dark.text}
        />
      }
    />
  );
}
