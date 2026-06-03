import { useAuthStore } from '@/store/auth-store';
import { Pressable, Text, View } from 'react-native';

export default function Index() {
  const onRemoveGuest = useAuthStore((state) => state.onRemoveGuest);

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable onPress={onRemoveGuest}>
        <Text>Open Bottomsheet</Text>
      </Pressable>
    </View>
  );
}
