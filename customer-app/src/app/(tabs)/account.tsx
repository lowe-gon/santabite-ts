import ThemedText from '@/components/themed-text';
import { useAuthStore } from '@/store/auth-store';
import { Pressable, View } from 'react-native';

export default function AccountScreen() {
  const removeUser = useAuthStore((state) => state.removeUser);

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Pressable onPress={removeUser}>
        <ThemedText>Logout</ThemedText>
      </Pressable>
    </View>
  );
}
