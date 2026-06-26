import SectionHeader from '@/components/section-header';
import type { DataItemProps } from '@/components/section-list';
import { SectionFlashList } from '@/components/section-list';
import { ThemedGlassView } from '@/components/themed-glass-view';
import ThemedText from '@/components/themed-text';
import type { MenuItem } from '@/data/restaurant';
import Categories from '@/features/restaurant/components/categories';
import Header from '@/features/restaurant/components/header';
import ListHeader from '@/features/restaurant/components/list-header';
import RestaurantCard from '@/features/restaurant/components/restaurant-card';
import useRestaurantDetail from '@/features/restaurant/hooks/use-restaurant-detail';
import useThemeColor from '@/hooks/use-theme-color';
import { cn } from '@/libs/cn';
import { isLiquidGlassAvailable } from '@/libs/utils';
import type { FlashListRef, ViewToken } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';
import {
  createAnimatedComponent,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const HEADER_HEIGHT = screenHeight * 0.25;

const AnimatedFlashList = createAnimatedComponent(SectionFlashList<MenuItem>);

export default function RestaurantDetailScreen() {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const { restaurant } = useRestaurantDetail(restaurantId);

  const text = useThemeColor('text');

  const insets = useSafeAreaInsets();
  const flashListRef = React.useRef<FlashListRef<DataItemProps<MenuItem>>>(null);
  const categoryScrollRef = React.useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const categoryTabWidth = 200;

  const offsetY = useSharedValue(0);

  const _onScroll = useAnimatedScrollHandler((e) => {
    'worklet';
    offsetY.value = e.contentOffset.y;
  });

  const sections = React.useMemo(() => {
    const categoriesMapped =
      restaurant?.categories.map((item, index) => ({
        index: index + 1,
        title: item.title,
        description: item.description ?? '',
        data: item.menu,
      })) ?? [];

    return [
      {
        index: 0,
        title: 'TABS_SECTION',
        description: '',
        data: [],
      },
      ...categoriesMapped,
    ];
  }, [restaurant]);

  const scrollCategoryTabIntoView = (index: number) => {
    categoryScrollRef.current?.scrollTo({
      x: index * categoryTabWidth - screenWidth / 2 + categoryTabWidth / 2,
      animated: true,
    });
  };

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const isManualScrolling = React.useRef(false);

  const _onTabPress = (tabIndex: number) => {
    setActiveTab(tabIndex);
    isManualScrolling.current = true;

    if (tabIndex === 0) {
      flashListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    } else {
      let targetFlatIndex = 1; // skip tabs section

      for (let i = 1; i < tabIndex; i++) {
        const section = sections[i];
        targetFlatIndex += 1 + (section?.data?.length ?? 0);
      }

      flashListRef.current?.scrollToIndex({
        index: targetFlatIndex,
        animated: true,
        viewOffset: 50,
        viewPosition: 0,
      });
    }

    scrollCategoryTabIntoView(tabIndex);
  };

  // Reset manual scrolling when user stops scrolling
  const _onMomentumScrollEnd = () => {
    isManualScrolling.current = false;
  };

  const _onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: ViewToken<DataItemProps<MenuItem>>[] }) => {
      if (isManualScrolling.current) return;

      if (viewableItems.length === 0) return;

      const firstVisible = viewableItems[0]?.item;
      if (!firstVisible) return;

      let newTabIndex = -1;

      if (firstVisible.type === 'section') {
        newTabIndex = firstVisible.index === 0 ? 0 : firstVisible.index - 1;
      } else if (firstVisible.type === 'item') {
        newTabIndex = firstVisible.sectionIndex - 1;
      }

      if (newTabIndex !== -1 && newTabIndex !== activeTab) {
        setActiveTab(newTabIndex);
        scrollCategoryTabIntoView(newTabIndex);
      }
    },
  ).current;

  const hasCart = true;

  return (
    <>
      <View className="bg-background relative flex-1 pt-28">
        <Header
          bannerURL={restaurant?.banner_url!}
          restaurantAddress={restaurant?.address!}
          restaurantName={restaurant?.name!}
          offsetY={offsetY}
          HEADER_HEIGHT={HEADER_HEIGHT}
        />

        <AnimatedFlashList
          ref={flashListRef}
          sections={sections}
          isStickyFirst
          renderItem={(item) => <RestaurantCard item={item} />}
          renderSection={(section, index) => {
            if (index === 0 || section.title === 'TAB_SECTION') {
              return (
                <Categories
                  ref={categoryScrollRef}
                  onTabPress={_onTabPress}
                  activeTab={activeTab}
                  categories={restaurant?.categories!}
                />
              );
            }

            return <SectionHeader title={section.title} description={section.description!} />;
          }}
          onScroll={_onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader item={restaurant!} offsetY={offsetY} HEADER_HEIGHT={HEADER_HEIGHT} />
          )}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={_onViewableItemsChanged}
          onMomentumScrollEnd={_onMomentumScrollEnd}
          contentContainerStyle={{
            paddingTop: HEADER_HEIGHT / 2,
            paddingBottom: 50,
          }}
          ItemSeparatorComponent={() => <View className="h-8" />}
        />

        {/* Cart Button */}
        <React.Activity mode={hasCart ? 'visible' : 'hidden'}>
          <View className="bottom-safe absolute right-4 left-4 z-50">
            <Pressable>
              <ThemedGlassView
                className={cn(
                  'h-16 flex-1 flex-row items-center justify-center rounded-full',
                  !isLiquidGlassAvailable() && 'bg-sky-500',
                )}
                isInteractive>
                {/* Count */}
                <View className="absolute top-1/2 left-8 -translate-y-1/2">
                  <View className="size-10 items-center justify-center rounded-full border border-white">
                    <ThemedText size="md">1</ThemedText>
                  </View>
                </View>
                {/* Detail */}
                <View className="flex-col items-center justify-center">
                  <ThemedText size="md" className="leading-tight">
                    View your cart
                  </ThemedText>
                  <ThemedText
                    className="w-36 text-[10px] leading-tight font-medium"
                    numberOfLines={1}>
                    {restaurant?.name} - {restaurant?.address}
                  </ThemedText>
                </View>

                {/* Total price */}
                <View className="absolute top-1/2 right-8 -translate-y-1/2">
                  <ThemedText size="md" numberOfLines={1}>
                    $ 11500.00
                  </ThemedText>
                </View>
              </ThemedGlassView>
            </Pressable>
          </View>
        </React.Activity>
      </View>
    </>
  );
}
