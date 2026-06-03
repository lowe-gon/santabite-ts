import { AntDesign } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export default function AppleButton() {
  return (
    <Pressable className="bg-card h-14 flex-row items-center justify-center rounded-2xl">
      <View className="absolute top-1/2 left-5 -translate-y-1/2">
        <AntDesign name="apple" size={22} />
      </View>
      <Text className="text-text-main text-sm font-semibold">Continue with Apple</Text>
    </Pressable>
  );
}
