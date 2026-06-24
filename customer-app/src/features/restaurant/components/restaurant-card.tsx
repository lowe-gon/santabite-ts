import ThemedText from '@/components/themed-text';
import type { MenuItem } from '@/data/restaurant';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

interface RestaurantCardProps {
  item: MenuItem;
}

export default function RestaurantCard({
  item: { name, description, price, image_url, id },
}: RestaurantCardProps) {
  return (
    <>
      <Pressable
        className="bg-background px-4"
        onPress={() =>
          router.push({
            pathname: '/restaurant/menu/[id]',
            params: {
              id,
            },
          })
        }>
        <View className="border-text-muted flex-row items-start gap-3 border-b pb-4">
          <View className="flex-1 gap-3">
            <ThemedText size="xl" numberOfLines={1}>
              {name}
            </ThemedText>
            <ThemedText size="sm" variant="muted" className="leading-px">
              {description}
            </ThemedText>
            <View className="flex-row items-center justify-between">
              <ThemedText size="lg" className="font-extrabold">
                ${price.toFixed(2)}
              </ThemedText>
              <View className="rounded-full bg-sky-500 p-2">
                <AntDesign name="plus" size={16} color="#ffffff" />
              </View>
            </View>
          </View>
          <View className="size-20 overflow-hidden rounded-2xl">
            <Image source={image_url} style={{ flex: 1 }} contentFit="cover" />
          </View>
        </View>
      </Pressable>
    </>
  );
}
