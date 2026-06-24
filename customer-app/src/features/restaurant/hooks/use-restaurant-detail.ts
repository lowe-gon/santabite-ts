import { getRestaurantById } from '@/data/restaurant';
import { useQuery } from '@tanstack/react-query';
import { useGlobalSearchParams } from 'expo-router';

/**
 *  Fetch restaurant detail
 * @param {string} id Restaurant ID
 */
export default function useRestaurantDetail(id: string) {
  const {} = useGlobalSearchParams;

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const { data } = await getRestaurantById(id);
      return data;
    },
    enabled: !!id,
  });

  return {
    restaurant,
    isLoadingRestaurant,
  };
}
