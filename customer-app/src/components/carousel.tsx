import useCarousel from '@/hooks/use-carousel';
import useThemeColor from '@/hooks/use-theme-color';
import { AnimatedFlashList, type ListRenderItem } from '@shopify/flash-list';
import { Pressable, View, type PressableProps } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

export interface CarouselProps<TData extends { id: string }> {
  data: TData[];
  renderItem: ListRenderItem<TData>;
  autoplayInterval?: number;
  itemWidth: number;
}

export default function Carousel<TData extends { id: string }>({
  data,
  renderItem,
  autoplayInterval = 3000,
  itemWidth,
}: CarouselProps<TData>) {
  const {
    flashListRef,
    isLayoutCompleteRef,
    scrollX,
    _onPaginationPress,
    _onScroll,
    _onViewableItemChanged,
  } = useCarousel({
    data,
    autoplayInterval,
    itemWidth,
  });

  return (
    <View className="relative w-full items-center">
      <AnimatedFlashList
        testID="CarouselScreen"
        ref={flashListRef as any}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        onLoad={() => {
          isLayoutCompleteRef.current = true;
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 0,
        }}
        onViewableItemsChanged={_onViewableItemChanged}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        scrollEventThrottle={16}
        renderItem={renderItem}
        onScroll={_onScroll}
      />

      {/* Pagination Indicators */}
      <View className="absolute -bottom-6 flex-row self-center">
        {data.map((_, index) => (
          <Pagination
            key={index.toString()}
            index={index}
            scrollX={scrollX}
            itemWidth={itemWidth}
            onPress={() => _onPaginationPress(index)}
          />
        ))}
      </View>
    </View>
  );
}

interface PaginationProps extends PressableProps {
  index: number;
  scrollX: SharedValue<number>;
  itemWidth: number;
}

function Pagination({ index, scrollX, itemWidth, ...props }: PaginationProps) {
  const backgroundMuted = useThemeColor('textMuted');

  const dotAnimatedStyle = useAnimatedStyle(() => ({
    width: interpolate(
      scrollX.value,
      [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
      [8, 20, 8],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(
      scrollX.value,
      [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP,
    ),
    backgroundColor: interpolateColor(
      scrollX.value,
      [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
      ['#ccc', backgroundMuted, '#ccc'],
    ),
  }));

  return (
    <Pressable {...props}>
      <Animated.View style={dotAnimatedStyle} className="mx-1 h-2 rounded-full" />
    </Pressable>
  );
}
