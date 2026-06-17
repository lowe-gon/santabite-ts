import Coupon from '@/features/home/components/coupon';
import Header from '@/features/home/components/header';
import RestaurantList from '@/features/home/components/resturant-list';
import useRestaurant from '@/features/home/hooks/use-restaurant';
import useLocation from '@/hooks/use-location';
import { ScrollView, View } from 'react-native';
import { useUniwind } from 'uniwind';

export default function Index() {
  const { theme } = useUniwind();
  const { status, location, _onRequestLocation } = useLocation();
  const { isLoadingNearby, isLoadingPopular, nearby, popular } = useRestaurant();

  return (
    <View className="bg-background flex-1">
      {/* Header */}
      <Header onRequestLocation={_onRequestLocation} location={location!} />

      {/* Coupon */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 pb-28"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <Coupon />

        {/* Categories */}
        {/* Popular restaurant */}
        <RestaurantList
          title="Popular restaurant"
          restaurants={popular!}
          isLoading={isLoadingPopular}
        />
        {/* Nearby restaurant */}
        <RestaurantList
          title="Nearby restaurant"
          restaurants={nearby!}
          isLoading={isLoadingNearby}
        />
      </ScrollView>
    </View>
  );
}
