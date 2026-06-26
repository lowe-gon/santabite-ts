import ThemedText from '@/components/themed-text';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { Pressable, useWindowDimensions, View } from 'react-native';

import type { RestaurantItem } from '@/data/restaurant';
import { router } from 'expo-router';
import {
  createAnimatedComponent,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface RestaurantItemProps {
  item: RestaurantItem;
}

const AnimatedPressable = createAnimatedComponent(Pressable);

export default function RestaurantItems({ item }: RestaurantItemProps) {
  const { width: screenWidth } = useWindowDimensions();
  const scale = useSharedValue(1);

  const pressableAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const _onPressIn = () => {
    'worklet';
    scale.value = withTiming(0.95, {
      duration: 150,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  };

  const _onPressOut = () => {
    'worklet';
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  };
  return (
    <>
      <AnimatedPressable
        style={[
          {
            width: screenWidth * 0.8,
          },
          pressableAnimatedStyle,
        ]}
        className="bg-surface h-52 overflow-hidden rounded-2xl"
        onPressIn={_onPressIn}
        onPressOut={_onPressOut}
        onPress={() =>
          router.push({
            pathname: '/[restaurantId]',
            params: {
              restaurantId: item.id,
            },
          })
        }>
        <ImageBackground
          source={{
            uri: item.banner_url,
          }}
          style={{
            flex: 1,
          }}>
          <View className="absolute inset-0 bg-black/50 bg-linear-to-t" />

          <View className="relative flex-1 flex-col justify-between p-4">
            {/* Favorite Button */}
            <Pressable className="absolute top-4 right-4 z-50 rounded-full">
              <EvilIcons name="heart" size={32} color={'#ffffff'} />
            </Pressable>

            <View className="w-32 flex-row items-center justify-center rounded-md bg-sky-500/40 p-1">
              <ThemedText className="font-semibold text-white">Free delivery</ThemedText>
            </View>

            {/* Information */}
            <View className="flex-1 justify-end">
              <View className="w-full flex-row items-center">
                {/* Restaurant name */}
                <ThemedText size="lg" className="max-w-52 text-white" numberOfLines={1}>
                  {item.name}
                </ThemedText>
                {/* Review count */}
                <View className="flex-1 flex-row items-center justify-end gap-1">
                  <AntDesign name="star" color={'orange'} size={14} />

                  <ThemedText className="font-semibold text-white">{item.rating}</ThemedText>
                  <ThemedText className="text-white">({item.review_count})</ThemedText>
                </View>
              </View>
              <ThemedText className="font-medium text-white">
                {item.estimated_travel_time} &middot; {item.price_range} &middot; {item.cuisine}
              </ThemedText>
            </View>
          </View>
        </ImageBackground>
      </AnimatedPressable>
    </>
  );
}
