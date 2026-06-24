import ThemedText from '@/components/themed-text';
import type { RestaurantItem } from '@/data/restaurant';
import useThemeColor from '@/hooks/use-theme-color';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface ListHeaderProps {
  item: RestaurantItem;
  offsetY: SharedValue<number>;
  HEADER_HEIGHT: number;
}

export default function ListHeader({ item, offsetY, HEADER_HEIGHT }: ListHeaderProps) {
  const textMuted = useThemeColor('textMuted');
  const [activeTab, setActiveTab] = React.useState(0);

  const avatarImageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(offsetY.value, [0, HEADER_HEIGHT * 0.5], [1, 0.5], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <View className="bg-background relative flex-col gap-3 pb-8">
      <View className="bg-background absolute -top-4 right-0 left-0 h-5 rounded-t-full" />

      {/* Avatar Image */}
      <View className="flex-row items-center justify-center">
        <Animated.View
          style={avatarImageAnimatedStyle}
          className="-mt-12 size-24 overflow-hidden rounded-2xl border-2 border-white">
          <Image
            source={item?.avatar_url}
            style={{
              flex: 1,
            }}
            contentFit="cover"
          />
        </Animated.View>
      </View>

      {/* Content */}
      <View className="flex-col items-center justify-center gap-4 px-4">
        <ThemedText size="title" numberOfLines={1}>
          {item?.name} - {item?.address}
        </ThemedText>

        {/* Ratings */}
        <View className="flex-row items-center gap-1">
          <AntDesign name="star" size={14} color={'orange'} />
          <ThemedText variant="muted" className="font-semibold">
            {item?.rating}
          </ThemedText>
          <ThemedText variant="muted" className="font-semibold">
            ({item?.review_count} ratings)
          </ThemedText>
        </View>

        {/* Delivery or Pickup Button & Share Button */}
        <View className="w-full flex-row items-center gap-3">
          <Pressable
            className="bg-surface/50 flex-1 flex-row items-center justify-center gap-1 rounded-2xl py-3"
            onPress={() => console.log('Delivery Pressed')}>
            <MaterialIcons name="delivery-dining" size={20} color={textMuted} />

            <ThemedText variant="muted" className="font-semibold">
              Delivery 20 - 30 min
            </ThemedText>

            <Ionicons name="chevron-down" size={20} color={textMuted} />
          </Pressable>

          <Pressable
            className="bg-surface/50 flex-row items-center justify-center gap-1 rounded-2xl p-3"
            onPress={() => console.log('Share Pressed')}>
            <Feather name="upload" size={20} color={textMuted} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
