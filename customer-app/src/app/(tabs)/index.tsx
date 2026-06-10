import { COLORS } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import { useUniwind } from 'uniwind';

export default function Index() {
  const { theme } = useUniwind();

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <Text className="font-righteous-regular text-sm text-red-500">Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
