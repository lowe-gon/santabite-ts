import useThemeColor from '@/hooks/use-theme-color';
import { Stack } from 'expo-router';

export const unstable_setting = {
  intialRouteName: '[id]',
};

export default function RestaurantLayout() {
  const backgroundColor = useThemeColor('background');

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="menu/[id]" />
    </Stack>
  );
}
