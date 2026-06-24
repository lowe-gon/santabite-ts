import ThemedText from '@/components/themed-text';
import useThemeColor from '@/hooks/use-theme-color';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function MenuDetailScreen() {
  const backgroundColor = useThemeColor('background');
  const router = useRouter();

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="star.fill">As text passed as children</Stack.Toolbar.Button>
      </Stack.Toolbar>

      <View className="bg-background flex-1">
        <ScrollView className="flex-1">
          <View className="h-200 flex-1">
            <ThemedText>Hello</ThemedText>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
