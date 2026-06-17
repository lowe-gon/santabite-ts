import { getNearbyRestaurants, getPopularAndNearbyRestaurants } from '@/data/restaurant';
import { useQuery } from '@tanstack/react-query';

export default function useRestaurant() {
  const { data: popular, isLoading: isLoadingPopular } = useQuery({
    queryKey: [
      'popularRestaurant',
      {
        lat: 37.785834,
        lng: -122.406417,
      },
    ],
    queryFn: async () => {
      const { data } = await getPopularAndNearbyRestaurants(37.785834, -122.406417);
      return data;
    },
  });

  const { data: nearby, isLoading: isLoadingNearby } = useQuery({
    queryKey: [
      'popularRestaurant',
      {
        lat: 37.785834,
        lng: -122.406417,
      },
    ],
    queryFn: async () => {
      const { data } = await getNearbyRestaurants(37.785834, -122.406417);
      return data;
    },
  });

  return {
    popular,
    nearby,
    isLoadingNearby,
    isLoadingPopular,
  };
}
