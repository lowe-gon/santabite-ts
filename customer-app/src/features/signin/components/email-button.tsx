import HapticPressable from '@/components/haptic-pressable';
import useThemeColor from '@/hooks/use-theme-color';
import { Fontisto } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmailButton() {
  const text = useThemeColor('text');
  const router = useRouter();

  return (
    <HapticPressable
      label="Continue with Email"
      className="bg-sky-500/20"
      iconLeft={<Fontisto name="email" size={24} color={'#00a5f4'} />}
      textColor="text-sky-500"
      onPress={() => router.replace('/(auth)/sign-up')}
    />
  );
}
