import Carousel from '@/components/carousel';
import { Dimensions, Image, Text, View } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const SCREEN_PADDING = 32;
const CAROUSEL_VIEWPORT_WIDTH = windowWidth - SCREEN_PADDING;

const CAROUSEL_DATA = [
  {
    id: '1',
    title: '50% OFF COFFEE',
    code: 'BREW50',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
  },
  {
    id: '2',
    title: '$10 OFF MEALS',
    code: 'EATS10',
    img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600',
  },
  {
    id: '3',
    title: 'FREE DELIVERY',
    code: 'FREESHIP',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600',
  },
  {
    id: '4',
    title: 'BUY 1 GET 1 FREE',
    code: 'BOGO',
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600',
  },
];

export default function Coupon() {
  return (
    <>
      <View style={{ height: CAROUSEL_VIEWPORT_WIDTH * 0.5 }} className="mt-4 mb-12 px-4">
        <Carousel
          data={CAROUSEL_DATA}
          itemWidth={CAROUSEL_VIEWPORT_WIDTH}
          autoplayInterval={3500}
          renderItem={({ item }) => (
            <View style={{ width: CAROUSEL_VIEWPORT_WIDTH }} className="h-full">
              {/* Outer Coupon Card Container */}
              <View className="relative h-full w-full flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
                {/* 1. LEFT SIDE: Coupon Details & Image */}
                <View className="relative flex-1 justify-end p-4">
                  <Image
                    source={{ uri: item.img }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Gradient/Dark Overlay for text legibility */}
                  <View className="absolute inset-0 bg-black/40 bg-linear-to-t" />

                  <Text className="z-10 text-xl font-black tracking-wide text-white uppercase">
                    {item.title}
                  </Text>
                  <Text className="z-10 mt-1 text-xs font-semibold text-gray-200">
                    Tap to activate offer
                  </Text>
                </View>

                {/* 2. MIDDLE: Dashed Separator Line & Punch-Out Notches */}
                <View className="relative h-full w-px items-center justify-center">
                  {/* Top Punch Out Cutout */}
                  <View className="bg-background absolute -top-3 h-6 w-6 rounded-full border border-gray-200" />

                  {/* Dashed Dividing Line */}
                  <View className="h-[75%] border-l border-dashed border-gray-400" />

                  {/* Bottom Punch Out Cutout */}
                  <View className="bg-background absolute -bottom-3 h-6 w-6 rounded-full border border-gray-200" />
                </View>

                {/* 3. RIGHT SIDE: Promo Code / Voucher Scan Area */}
                <View className="w-1/3 items-center justify-center bg-gray-50 p-3">
                  <Text className="mb-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    PROMO CODE
                  </Text>
                  <View className="w-full items-center rounded border border-dashed border-gray-300 bg-white px-2 py-1.5">
                    <Text className="text-xs font-bold tracking-tighter text-gray-800">
                      {item.code}
                    </Text>
                  </View>

                  {/* Decorative Mock Barcode Lines */}
                  <View className="mt-3 h-6 w-full flex-row items-center justify-center opacity-60">
                    <View className="mx-px h-full w-0.5 bg-gray-800" />
                    <View className="mx-px h-full w-1 bg-gray-800" />
                    <View className="mx-px h-full w-px bg-gray-800" />
                    <View className="mx-px h-full w-0.75 bg-gray-800" />
                    <View className="mx-px h-full w-px bg-gray-800" />
                    <View className="mx-px h-full w-1 bg-gray-800" />
                    <View className="mx-px h-full w-0.5 bg-gray-800" />
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}
