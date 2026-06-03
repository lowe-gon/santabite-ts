import { Text, View } from 'react-native';

export default function Divider() {
  return (
    <View className="relative my-4 h-px w-full bg-gray-300">
      <Text className="bg-background text-text-muted absolute -top-3 left-1/2 -translate-x-1/2 px-4 text-sm font-semibold">
        or
      </Text>
    </View>
  );
}
