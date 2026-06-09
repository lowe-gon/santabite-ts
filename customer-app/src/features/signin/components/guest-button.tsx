import HapticPressable from '@/components/haptic-pressable';
import useThemeColor from '@/hooks/use-theme-color';

export default function GuestButton() {
  const text = useThemeColor('text');

  return (
    <HapticPressable
      label="Continue as Guest"
      className="bg-transparent"
      textColor="text-sky-500"
    />
  );
}
