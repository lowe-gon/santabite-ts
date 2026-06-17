import type { CarouselProps } from '@/components/carousel';
import { type FlashListRef, type ViewToken } from '@shopify/flash-list';
import React from 'react';
import {
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function useCarousel<TData extends { id: string }>({
  data,
  itemWidth,
  autoplayInterval,
}: Omit<CarouselProps<TData>, 'renderItem'>) {
  const flashListRef = React.useRef<FlashListRef<TData>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = useSharedValue(0);

  const { width: screenWidth } = useWindowDimensions();
  const lastVisibleIndexRef = React.useRef(0);
  const isLayoutCompleteRef = React.useRef(false);

  // Synchronized Autoplay Logic
  React.useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }

      flashListRef.current?.scrollToOffset({
        offset: nextIndex * itemWidth,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, data, autoplayInterval, itemWidth]);

  React.useMemo(() => {
    if (isLayoutCompleteRef.current) {
      flashListRef.current?.clearLayoutCacheOnUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  React.useEffect(() => {
    if (isLayoutCompleteRef.current) {
      const targetIndex = lastVisibleIndexRef.current;
      setTimeout(() => {
        flashListRef.current?.scrollToIndex({
          index: targetIndex,
          animated: false,
        });
      }, 0);
    }
  }, [screenWidth]);

  const _onViewableItemChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<TData>[] }) => {
      viewableItems.forEach((item) => {
        if (item.index !== lastVisibleIndexRef.current && item.isViewable) {
          lastVisibleIndexRef.current = item.index ?? 0;
        }
      });
    },
    [],
  );

  const _onMomentumScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / itemWidth);
      setCurrentIndex(index);
    },
    [itemWidth],
  );

  const _onScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollX.value = event.nativeEvent.contentOffset.x;
    },
    [scrollX],
  );

  const _onPaginationPress = React.useCallback((index: number) => {
    flashListRef.current?.scrollToOffset({ offset: index * itemWidth, animated: true });
    setCurrentIndex(index);
  }, []);

  return {
    flashListRef,
    scrollX,
    screenWidth,
    lastVisibleIndexRef,
    isLayoutCompleteRef,
    _onMomentumScrollEnd,
    _onPaginationPress,
    _onScroll,
    _onViewableItemChanged,
  };
}
