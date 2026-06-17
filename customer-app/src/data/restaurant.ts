import { calculateDistance } from '@/libs/calculate-distance';

const restaurant: RestaurantItemProps[] = [
  {
    id: 'rest_sf_001',
    name: 'The Rotunda',
    cuisine: 'American / New Contemporary',
    rating: 4.6,
    review_count: 1420,
    price_range: '$$$',
    address: '150 Stockton St, San Francisco, CA 94108',
    coordinates: { latitude: 37.786842, longitude: -122.406214 },
    phone: '+1 (415) 362-4777',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: [
      'Lobster Club Sandwich',
      'Popovers with Strawberry Butter',
      'Chilled Seafood Platter',
    ],
  },
  {
    id: 'rest_sf_002',
    name: 'E&O Kitchen and Bar',
    cuisine: 'Asian Fusion',
    rating: 4.4,
    review_count: 1850,
    price_range: '$$$',
    address: '314 Sutter St, San Francisco, CA 94108',
    coordinates: { latitude: 37.789234, longitude: -122.405781 },
    phone: '+1 (415) 693-0303',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url: '', // Simulating a missing banner image
    featured_dishes: ['Indonesian Corn Fritters', 'Ahi Tuna Tartare', 'Peking Duck Slicers'],
  },
  {
    id: 'rest_sf_003',
    name: "Scala's Bistro",
    cuisine: 'Italian',
    rating: 4.3,
    review_count: 2108,
    price_range: '$$$',
    address: '432 Powell St, San Francisco, CA 94102',
    coordinates: { latitude: 37.788415, longitude: -122.408544 },
    phone: '+1 (415) 395-8555',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Rigatoni Bolognese', 'Seared Sea Scallops', 'Tiramisu'],
  },
  {
    id: 'rest_sf_004',
    name: 'Sons & Daughters',
    cuisine: 'Fine Dining / New American',
    rating: 4.8,
    review_count: 695,
    price_range: '$$$$',
    address: '708 Bush St, San Francisco, CA 94108',
    coordinates: { latitude: 37.789914, longitude: -122.409028 },
    phone: '+1 (415) 391-8311',
    is_open: false,
    avatar_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url: '', // Simulating another missing banner image
    featured_dishes: ['Seasonal Tasting Menu', 'Squab with Black Garlic', 'Dungeness Crab Tartlet'],
  },
  {
    id: 'rest_sf_005',
    name: 'Cafe De La Presse',
    cuisine: 'French Bistro',
    rating: 4.2,
    review_count: 1642,
    price_range: '$$',
    address: '352 Grant Ave, San Francisco, CA 94108',
    coordinates: { latitude: 37.789115, longitude: -122.405132 },
    phone: '+1 (415) 398-2680',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Croque Monsieur', 'Steak Frites', 'Duck Confit'],
  },
];

export interface RestaurantItemProps {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  review_count: number;
  price_range: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  is_open: boolean;
  avatar_url: string;
  banner_url: string;
  featured_dishes: string[];
  distance_miles?: number;
  estimated_travel_time?: string;
}

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  data: T | null;
  error?: string;
}

// Global fallback image if banner data is empty or missing
const FALLBACK_BANNER_URL =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&h=400&q=80';

/**
 * Helper function to generate a realistic time range string based on miles
 */
function generateTimeEstimate(miles: number): string {
  const baseMinutes = miles * 5;
  const minTime = Math.max(2, Math.floor(baseMinutes));
  const maxTime = Math.max(5, Math.ceil(baseMinutes + 4));
  return `${minTime}-${maxTime} min`;
}

/**
 * Fetches all mock restaurants with safely handled fallback banner images
 */
export async function getResturants(): Promise<ApiResponse<RestaurantItemProps[]>> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const processedData = restaurant.map((item) => ({
    ...item,
    banner_url: item.banner_url || FALLBACK_BANNER_URL,
  }));

  return {
    status: 200,
    success: true,
    data: processedData,
  };
}

/**
 * Fetches a single mock restaurant item by its unique ID
 */
export async function getRestaurantById(id: string): Promise<ApiResponse<RestaurantItemProps>> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const found = restaurant.find((item) => item.id === id);

  if (!found) {
    return { status: 404, success: false, data: null, error: 'Restaurant not found' };
  }

  return {
    status: 200,
    success: true,
    data: {
      ...found,
      banner_url: found.banner_url || FALLBACK_BANNER_URL,
    },
  };
}

/**
 * Fetches restaurants filtered by user coordinates and maximum radius
 */
export async function getNearbyRestaurants(
  userLat: number,
  userLon: number,
  radiusMiles: number = 0.5,
): Promise<ApiResponse<RestaurantItemProps[]>> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  try {
    const nearby = restaurant
      .map((item) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          item.coordinates.latitude,
          item.coordinates.longitude,
        );
        const distance_miles = parseFloat(distance.toFixed(2));

        return {
          ...item,
          distance_miles,
          estimated_travel_time: generateTimeEstimate(distance_miles),
          banner_url: item.banner_url || FALLBACK_BANNER_URL, // Fallback assignment
        };
      })
      .filter((item) => item.distance_miles <= radiusMiles)
      .sort((a, b) => a.distance_miles - b.distance_miles);

    return {
      status: 200,
      success: true,
      data: nearby,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      data: null,
      error: 'Failed to calculate nearby boundaries.',
    };
  }
}

/**
 * Fetches popular restaurants within a radius, sorted by distance
 */
export async function getPopularAndNearbyRestaurants(
  userLat: number,
  userLon: number,
  radiusMiles: number = 1.0,
): Promise<ApiResponse<RestaurantItemProps[]>> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  try {
    const popularNearby = restaurant
      .map((item) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          item.coordinates.latitude,
          item.coordinates.longitude,
        );
        const distance_miles = parseFloat(distance.toFixed(2));

        return {
          ...item,
          distance_miles,
          estimated_travel_time: generateTimeEstimate(distance_miles),
          banner_url: item.banner_url || FALLBACK_BANNER_URL, // Fallback assignment
        };
      })
      .filter((item) => {
        const isWithinRadius = item.distance_miles <= radiusMiles;
        const isPopular = item.rating >= 4.5;
        return isWithinRadius && isPopular;
      })
      .sort((a, b) => a.distance_miles - b.distance_miles);

    return {
      status: 200,
      success: true,
      data: popularNearby,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      data: null,
      error: 'Failed to process popular nearby filters.',
    };
  }
}
