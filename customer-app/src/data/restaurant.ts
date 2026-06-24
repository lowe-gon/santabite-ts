import { calculateDistance } from '@/libs/calculate-distance';

export interface MenuAddon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  addons?: MenuAddon[];
}

export interface MenuCategory {
  title: string;
  description?: string;
  menu: MenuItem[];
}

export interface RestaurantItem {
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
  categories: MenuCategory[];
  distance_miles?: number;
  estimated_travel_time?: string;
}

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  data: T | null;
  error?: string;
}

const restaurant: Omit<RestaurantItem, 'distance_miles' | 'estimated_travel_time'>[] = [
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
    featured_dishes: ['Lobster Club Sandwich', 'Chilled Seafood Platter', 'Popovers'],
    categories: [
      {
        title: 'Appetizers',
        description: 'Signature starters to begin your dining experience.',
        menu: [
          {
            id: 'menu_rot_001',
            name: 'Popovers with Strawberry Butter',
            price: 12.0,
            description: 'House-baked airy popovers served warm with whipped strawberry butter.',
            image_url:
              'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
            addons: [{ id: 'addon_rot_001_1', name: 'Extra Strawberry Butter', price: 1.5 }],
          },
        ],
      },
      {
        title: 'Mains',
        description: 'Hearty entrées and signature dishes.',
        menu: [
          {
            id: 'menu_rot_002',
            name: 'Lobster Club Sandwich',
            price: 34.0,
            description:
              'Fresh Maine lobster, applewood smoked bacon, avocado, lettuce, tomato on toasted brioche.',
            image_url:
              'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80',
            addons: [
              { id: 'addon_rot_002_1', name: 'Extra Bacon', price: 3.5 },
              { id: 'addon_rot_002_2', name: 'Double Lobster Meat', price: 14.0 },
            ],
          },
          {
            id: 'menu_rot_003',
            name: 'Chilled Seafood Platter',
            price: 65.0,
            description: 'Oysters, jumbo shrimp, crab claws, and lobster tail with classic sauces.',
            image_url:
              'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_rot_004',
            name: 'Grilled Branzino',
            price: 48.0,
            description:
              'Whole grilled Mediterranean branzino with preserved lemon and herb salsa.',
            image_url:
              'https://images.unsplash.com/photo-1546833999-8feaff55ab30?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Caviar Service',
        description: 'Premium sustainably raised caviar served with traditional accompaniments.',
        menu: [
          {
            id: 'menu_rot_005',
            name: 'Siberian Sturgeon Caviar',
            price: 120.0,
            description:
              '1 oz presentation served with warm blinis, chopped egg, chives, and crème fraîche.',
            image_url:
              'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Signature Soups',
        description: 'Classic, comforting soups prepared fresh daily.',
        menu: [
          {
            id: 'menu_rot_006',
            name: 'Maine Lobster Bisque',
            price: 18.0,
            description:
              'Velvety smooth broth finished with sweet lobster morsels and a touch of sherry.',
            image_url:
              'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Desserts',
        description: 'Sweet endings to your meal.',
        menu: [
          {
            id: 'menu_rot_007',
            name: 'Classic New York Cheesecake',
            price: 14.0,
            description: 'Rich and creamy with graham cracker crust and berry compote.',
            image_url:
              'https://images.unsplash.com/photo-1563729784474-77d17a8e7c3f?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'rest_sf_002',
    name: "Masa's",
    cuisine: 'French Fine Dining',
    rating: 4.8,
    review_count: 912,
    price_range: '$$$$',
    address: '648 Bush St, San Francisco, CA 94108',
    coordinates: { latitude: 37.7893, longitude: -122.4081 },
    phone: '+1 (415) 989-7154',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: [
      'Maine Lobster Risotto',
      'Pan-Seared Foie Gras',
      'Valrhona Chocolate Soufflé',
    ],
    categories: [
      {
        title: 'Les Entrées',
        description: 'Exquisite French starters.',
        menu: [
          {
            id: 'menu_mas_001',
            name: 'Pan-Seared Foie Gras',
            price: 38.0,
            description:
              'Hudson Valley foie gras with caramelized roasted figs and aged balsamic glaze.',
            image_url:
              'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80',
            addons: [{ id: 'addon_mas_001_1', name: 'Shaved Black Truffle', price: 15.0 }],
          },
        ],
      },
      {
        title: 'Les Plats',
        description: 'Masterfully crafted main courses.',
        menu: [
          {
            id: 'menu_mas_002',
            name: 'Maine Lobster Risotto',
            price: 52.0,
            description:
              'Butter-poached lobster over a rich, creamy saffron risotto with micro greens.',
            image_url:
              'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_mas_003',
            name: 'Roasted Duck Breast',
            price: 46.0,
            description:
              'Spiced honey-glazed duck breast served with parsnip purée and cherry gastrique.',
            image_url:
              'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Les Fromages',
        description: 'Artisanal French and domestic cheeses curated by our sommelier.',
        menu: [
          {
            id: 'menu_mas_004',
            name: 'Chef’s Selection Cheese Board',
            price: 29.0,
            description:
              'Three perfectly aged cheeses served with honeycomb, marcona almonds, and house baguette.',
            image_url:
              'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Les Desserts Finis',
        description: 'Decadent, classical French confections.',
        menu: [
          {
            id: 'menu_mas_005',
            name: 'Valrhona Chocolate Soufflé',
            price: 18.0,
            description: 'Warm, airy chocolate soufflé paired with grand marnier crème anglaise.',
            image_url:
              'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'rest_sf_003',
    name: 'Liholiho Yacht Club',
    cuisine: 'Hawaiian / Asian-American',
    rating: 4.7,
    review_count: 2450,
    price_range: '$$$',
    address: '871 Sutter St, San Francisco, CA 94109',
    coordinates: { latitude: 37.7884, longitude: -122.4146 },
    phone: '+1 (415) 440-5446',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Beef Tongue Spam Musubi', 'Tuna Poke', 'Baked Hawaii'],
    categories: [
      {
        title: 'Snacks & Starters',
        description: 'Coastal bites bursting with flavor.',
        menu: [
          {
            id: 'menu_lih_001',
            name: 'Beef Tongue Spam Musubi',
            price: 14.0,
            description: 'House-made beef tongue spam, premium sushi rice, wrapped in nori.',
            image_url:
              'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_lih_002',
            name: 'Yellowfin Tuna Poke',
            price: 21.0,
            description:
              'Fresh yellowfin tuna tossed with sesame oil, ogo seaweed, and crisp taro chips.',
            image_url:
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Mains',
        description: 'Hearty family-style platters.',
        menu: [
          {
            id: 'menu_lih_003',
            name: 'Roasted Cornish Game Hen',
            price: 36.0,
            description:
              'Glazed with black bean chili paste, served alongside ginger scallion rice.',
            image_url:
              'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Tropical Elixirs',
        description: 'House-made non-alcoholic updates on beach-side classics.',
        menu: [
          {
            id: 'menu_lih_004',
            name: 'Liholiho Mai Tai Mocktail',
            price: 9.5,
            description:
              'Fresh squeezed lime, almond orgeat, pineapple nectar, and a splash of sparkling water.',
            image_url:
              'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'rest_sf_004',
    name: 'Sons & Daughters',
    cuisine: 'Contemporary American / Nordic',
    rating: 4.9,
    review_count: 620,
    price_range: '$$$$',
    address: '132 Bush St, San Francisco, CA 94104',
    coordinates: { latitude: 37.7904, longitude: -122.4021 },
    phone: '+1 (415) 391-8311',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Dungeness Crab Tart', 'Aged Squab', 'Sourdough with Smoked Butter'],
    categories: [
      {
        title: 'Tasting Menu Highlights',
        description: 'Micro-seasonal dishes focused on Northern California provisions.',
        menu: [
          {
            id: 'menu_snd_001',
            name: 'Local Dungeness Crab Tart',
            price: 28.0,
            description:
              'Sweet crab meat layered with delicate kohlrabi and seasoned with wild ramp oil.',
            image_url:
              'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_snd_002',
            name: 'Dry Aged Squab',
            price: 48.0,
            description:
              'Roasted on the bone, served with huckleberry jus and pine needle oil infusion.',
            image_url:
              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Ferments & Breads',
        description: 'House-milled, slow-fermented breads utilizing ancient grains.',
        menu: [
          {
            id: 'menu_snd_003',
            name: 'Heritage Sourdough Bread',
            price: 12.0,
            description:
              'Baked daily in wood-fire ovens, served with hand-churned smoked sea salt butter.',
            image_url:
              'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'rest_sf_006',
    name: 'Nopalito',
    cuisine: 'Mexican',
    rating: 4.7,
    review_count: 1240,
    price_range: '$$',
    address: '1224 9th Ave, San Francisco, CA 94122',
    coordinates: { latitude: 37.7648, longitude: -122.4662 },
    phone: '+1 (415) 233-9966',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1565299585323-38d6f2c8c2a3?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1514933651103-005eec06c7a0?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Carnitas Tacos', 'Mole Poblano', 'Guacamole'],
    categories: [
      {
        title: 'Antojitos',
        description: 'Small bites and street food favorites.',
        menu: [
          {
            id: 'menu_nop_001',
            name: 'Guacamole',
            price: 14.0,
            description: 'Fresh avocado with cilantro, onion, lime, and house-made tortilla chips.',
            image_url:
              'https://images.unsplash.com/photo-1598679950942-5f1a7a0e1f9c?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_nop_002',
            name: 'Quesadilla de Flor',
            price: 13.0,
            description: 'Squash blossom and cheese quesadilla.',
            image_url:
              'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Tacos',
        description: 'Handmade corn tortillas with premium fillings.',
        menu: [
          {
            id: 'menu_nop_003',
            name: 'Carnitas Tacos',
            price: 6.5,
            description: 'Slow-cooked pork with pickled onion and cilantro.',
            image_url:
              'https://images.unsplash.com/photo-1565299585323-38d6f2c8c2a3?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_nop_004',
            name: 'Al Pastor Tacos',
            price: 6.75,
            description: 'Marinated pork with pineapple and salsa.',
            image_url:
              'https://images.unsplash.com/photo-1599481238640-4c128b1f0b7a?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Postres',
        description: 'Sweet, authentic Mexican finishes.',
        menu: [
          {
            id: 'menu_nop_005',
            name: 'Churros con Chocolate',
            price: 10.0,
            description:
              'House-fried crisp pastry dough rolled in cinnamon sugar with stone-ground dipping chocolate.',
            image_url:
              'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Aguas Frescas',
        description: 'Refreshing traditional fruit waters prepared daily.',
        menu: [
          {
            id: 'menu_nop_006',
            name: 'Agua de Horchata',
            price: 5.0,
            description: 'Sweetened milk-based rice drink infused with fragrant Mexican cinnamon.',
            image_url:
              'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'rest_sf_007',
    name: 'Akiko',
    cuisine: 'Japanese / Sushi',
    rating: 4.8,
    review_count: 890,
    price_range: '$$$$',
    address: '431 Bush St, San Francisco, CA 94108',
    coordinates: { latitude: 37.7901, longitude: -122.4059 },
    phone: '+1 (415) 397-3218',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1579877270900-8c4c8c8c8c8c?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1551218808-0e3e0c2f3f3f?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Omakase', 'Wagyu Nigiri', 'Uni'],
    categories: [
      {
        title: 'Nigiri & Sashimi',
        description: 'Premium fish and seafood.',
        menu: [
          {
            id: 'menu_aki_001',
            name: 'O-toro Nigiri',
            price: 18.0,
            description: 'Fatty tuna nigiri.',
            image_url:
              'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80',
          },
          {
            id: 'menu_aki_002',
            name: 'Uni',
            price: 22.0,
            description: 'Fresh sea urchin.',
            image_url:
              'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Maki Rolls',
        description: 'Creative and classic rolls.',
        menu: [
          {
            id: 'menu_aki_003',
            name: 'Spicy Tuna Roll',
            price: 16.0,
            description: 'Tuna, spicy mayo, cucumber.',
            image_url:
              'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Zen Starters',
        description: 'Hot kitchen appetizers designed to ground the palate.',
        menu: [
          {
            id: 'menu_aki_004',
            name: 'Miso Black Cod Bite',
            price: 24.0,
            description:
              'Sablefish marinated for 72 hours in sweet saikyo miso, broiled to caramelized perfection.',
            image_url:
              'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
  {
    id: 'rest_sf_008',
    name: 'Dosa',
    cuisine: 'Indian / South Indian',
    rating: 4.5,
    review_count: 1650,
    price_range: '$$',
    address: '995 Valencia St, San Francisco, CA 94110',
    coordinates: { latitude: 37.7571, longitude: -122.4214 },
    phone: '+1 (415) 642-3672',
    is_open: true,
    avatar_url:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=150&h=150&q=80',
    banner_url:
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&h=400&q=80',
    featured_dishes: ['Masala Dosa', 'Chicken Chettinad', 'Lamb Biryani'],
    categories: [
      {
        title: 'Dosas & Uttapams',
        description: 'Crisp fermented rice crepes.',
        menu: [
          {
            id: 'menu_dos_001',
            name: 'Masala Dosa',
            price: 14.0,
            description: 'Crispy dosa filled with spiced potato.',
            image_url:
              'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Curries',
        description: 'Rich and flavorful Indian curries.',
        menu: [
          {
            id: 'menu_dos_002',
            name: 'Butter Chicken',
            price: 19.0,
            description: 'Tandoori chicken in creamy tomato sauce.',
            image_url:
              'https://images.unsplash.com/photo-1603894584373-5ac82b2ae784?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
      {
        title: 'Tandoor Clay Oven',
        description: 'Meats and breads roasted over live clay oven fires.',
        menu: [
          {
            id: 'menu_dos_003',
            name: 'Garlic Herb Naan',
            price: 4.5,
            description:
              'Leavened flatbread brushed with fresh minced garlic, cilantro, and pure ghee.',
            image_url:
              'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80',
          },
        ],
      },
    ],
  },
];

const FALLBACK_BANNER_URL =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&h=400&q=80';

function generateTimeEstimate(miles: number): string {
  const baseMinutes = miles * 5;
  const minTime = Math.max(2, Math.floor(baseMinutes));
  const maxTime = Math.max(5, Math.ceil(baseMinutes + 4));
  return `${minTime}-${maxTime} min`;
}

export async function getResturants(): Promise<ApiResponse<RestaurantItem[]>> {
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

export async function getRestaurantById(id: string): Promise<ApiResponse<RestaurantItem>> {
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

export async function getNearbyRestaurants(
  userLat: number,
  userLon: number,
  radiusMiles: number = 0.5,
): Promise<ApiResponse<RestaurantItem[]>> {
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
          banner_url: item.banner_url || FALLBACK_BANNER_URL,
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

export async function getPopularAndNearbyRestaurants(
  userLat: number,
  userLon: number,
  radiusMiles: number = 1.0,
): Promise<ApiResponse<RestaurantItem[]>> {
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
          banner_url: item.banner_url || FALLBACK_BANNER_URL,
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
