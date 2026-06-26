import useThemeColor from '@/hooks/use-theme-color';
import { cn } from '@/libs/cn';
import { isLiquidGlassAvailable } from '@/libs/utils';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { GlassContainer, GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Animated, {
  createAnimatedComponent,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

interface RestaurantHeaderProps {
  bannerURL: string;
  offsetY: SharedValue<number>;
  HEADER_HEIGHT: number;
  restaurantName: string;
  restaurantAddress: string;
}

const ThemedGlassView = withUniwind(GlassView);
const ThemedGlassContainer = withUniwind(GlassContainer);
const AnimatedImage = createAnimatedComponent(Image);

export default function Header({
  bannerURL,
  restaurantAddress,
  restaurantName,
  offsetY,
  HEADER_HEIGHT,
}: RestaurantHeaderProps) {
  const text = useThemeColor('text');
  const backgroundColor = useThemeColor('background');
  const router = useRouter();

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          offsetY.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, -HEADER_HEIGHT * 0.5],
          Extrapolation.CLAMP,
        ),
      },
      {
        scale: interpolate(offsetY.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [5, 1, 1], {
          extrapolateLeft: Extrapolation.EXTEND,
          extrapolateRight: Extrapolation.CLAMP,
        }),
      },
    ],
  }));

  const bannerImageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      offsetY.value,
      [0, HEADER_HEIGHT * 0.5, HEADER_HEIGHT],
      [1, 0.5, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const searchButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          offsetY.value,
          [0, HEADER_HEIGHT],
          [0, -HEADER_HEIGHT * 0.38],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const searchTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      offsetY.value,
      [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
      [1, 0, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const restaurantLabelAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      offsetY.value,
      [0, HEADER_HEIGHT * 0.4, HEADER_HEIGHT],
      [0, 0, 0.5],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <>
      <ThemedGlassContainer className="top-safe absolute left-0 z-50 w-full flex-row items-center gap-4 px-4">
        {/* Back button */}

        <Pressable onPress={router.back}>
          <ThemedGlassView
            className="size-12 flex-row items-center justify-center rounded-full"
            isInteractive>
            <View
              className={cn(
                'h-full w-full flex-row items-center justify-center rounded-full',
                !isLiquidGlassAvailable() && 'bg-surface',
              )}>
              <Ionicons name="chevron-back" size={24} color={text} />
            </View>
          </ThemedGlassView>
        </Pressable>

        {/* Search button */}
        <Pressable onPress={() => console.log('Search pressed')} className="flex-1">
          <ThemedGlassView
            className={cn(
              'h-12 flex-row items-center justify-center rounded-full',
              !isLiquidGlassAvailable() && 'bg-surface',
            )}
            isInteractive>
            <Animated.View
              style={searchButtonAnimatedStyle}
              className="flex-row items-center gap-1">
              <Ionicons name="search" size={20} color={text} />
              <View className="relative flex-row items-center">
                <Animated.Text style={searchTextAnimatedStyle} className="text-text font-semibold">
                  Search
                </Animated.Text>
                {/* Restaurant label */}
                <Animated.Text
                  style={restaurantLabelAnimatedStyle}
                  className="text-text absolute top-0 max-w-52 font-semibold"
                  numberOfLines={1}>
                  {restaurantName} - {restaurantAddress}
                </Animated.Text>
              </View>
            </Animated.View>
          </ThemedGlassView>
        </Pressable>

        {/* More button */}
        <Pressable onPress={() => console.log('More pressed')}>
          <ThemedGlassView
            className="size-12 flex-row items-center justify-center rounded-full"
            isInteractive>
            <View
              className={cn(
                'h-full w-full flex-row items-center justify-center rounded-full',
                !isLiquidGlassAvailable() && 'bg-surface',
              )}>
              <MaterialIcons name="more-horiz" size={24} color={text} />
            </View>
          </ThemedGlassView>
        </Pressable>
      </ThemedGlassContainer>

      <Animated.View
        style={[
          {
            height: HEADER_HEIGHT,
            flex: 1,
          },
          headerAnimatedStyle,
        ]}
        className="absolute top-0 right-0 left-0">
        <View className="relative flex-1">
          <AnimatedImage
            source={bannerURL}
            style={[
              {
                flex: 1,
              },
              bannerImageAnimatedStyle,
            ]}
            contentFit="cover"
          />
        </View>
      </Animated.View>
    </>
  );
}
