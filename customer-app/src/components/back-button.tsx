import { Pressable, View } from 'react-native';

import { ThemedGlassView } from '@/components/themed-glass-view';
import useTheme from '@/hooks/use-theme';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { ChevronLeft } from 'lucide-react-native';

interface IBackButtonProps {
  router: () => void;
}

export default function BackButton({ router }: IBackButtonProps) {
  const { text } = useTheme();

  if (isLiquidGlassAvailable()) {
    return (
      <ThemedGlassView className="top-safe absolute left-4 rounded-full p-2" isInteractive>
        <Pressable onPress={router} className="flex-1">
          <ChevronLeft size={30} color={text} />
        </Pressable>
      </ThemedGlassView>
    );
  }

  return (
    <View className="top-safe absolute left-4 rounded-full p-2">
      <Pressable onPress={router} className="flex-1">
        <ChevronLeft size={30} color={text} />
      </Pressable>
    </View>
  );
}
