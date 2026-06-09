import HapticPressable from '@/components/haptic-pressable';
import { COLORS } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';

export default function GoogleButton() {
  return (
    <HapticPressable
      label="Continue with Google"
      iconLeft={<AntDesign name="google" size={24} color={COLORS.dark.text} />}
      textColor="text-white"
    />
  );
}
