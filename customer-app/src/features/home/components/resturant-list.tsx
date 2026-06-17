import HapticPressable from '@/components/haptic-pressable';
import ThemedText from '@/components/themed-text';
import type { RestaurantItemProps } from '@/data/restaurant';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import RestaurantItems from './restaurant-item';

interface RestaurantListProps {
  title: string;
  restaurants: RestaurantItemProps[];
  isLoading: boolean;
}

export default function RestaurantList({ title, restaurants }: RestaurantListProps) {
  return (
    <>
      <View className="w-full flex-row items-center justify-between px-4">
        <ThemedText size="lg" className="font-extrabold">
          {title}
        </ThemedText>
        <HapticPressable
          variant="ghost"
          size="xs"
          label="See more"
          textColor="text-sky-500 text-sm"
        />
      </View>

      <FlashList
        testID="RestaurantContainer"
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4"
        renderItem={({ item }) => <RestaurantItems item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </>
  );
}
