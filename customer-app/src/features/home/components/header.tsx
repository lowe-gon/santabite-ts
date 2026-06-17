import { ThemedGlassView } from '@/components/themed-glass-view';
import ThemedText from '@/components/themed-text';
import useThemeColor from '@/hooks/use-theme-color';
import type { LocationProps } from '@/libs/location';
import { BottomSheetModal, BottomSheetView } from '@expo/ui/community/bottom-sheet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

interface HeaderProps {
  onRequestLocation: () => void;
  location: LocationProps;
}

export default function Header({ location, onRequestLocation }: HeaderProps) {
  const text = useThemeColor('text');

  const modalRef = React.useRef<BottomSheetModal>(null);

  const formattedLocation =
    [location?.street, location?.district, location?.city, location?.country]
      .filter(Boolean)
      .join(', ') || 'Your location';

  console.log(location?.coords);

  return (
    <>
      <View className="pt-safe w-full flex-row items-center justify-between px-4">
        <Pressable onPress={() => modalRef.current?.present()}>
          <ThemedText className="leading-tight">Delivery to:</ThemedText>
          <View className="flex-row items-center gap-2">
            <ThemedText size="md" className="max-w-52 leading-tight" numberOfLines={1}>
              {formattedLocation}
            </ThemedText>

            <Ionicons name="chevron-down" size={20} color={text} />
          </View>
        </Pressable>
      </View>

      <BottomSheetModal ref={modalRef} enablePanDownToClose>
        <BottomSheetView
          style={{
            flex: 1,
          }}>
          <View className="gap-4 p-4">
            <View className="flex-row items-center justify-end">
              <ThemedGlassView
                className="size-10 flex-row items-center justify-center rounded-full bg-gray-50"
                isInteractive>
                <Pressable onPress={() => modalRef.current?.close()}>
                  <Ionicons name="close" size={24} color={text} />
                </Pressable>
              </ThemedGlassView>
            </View>
            <ThemedText size="title">Choose your location</ThemedText>

            <View>
              <Pressable
                className="border-text-muted/40 flex-row items-center gap-3 border-b py-4"
                onPress={() => {
                  modalRef.current?.close();
                  onRequestLocation();
                }}>
                <MaterialIcons name="location-searching" size={24} color={text} />
                <ThemedText size="md">Use my current location</ThemedText>
              </Pressable>
              <Pressable className="flex-row items-center gap-3 py-4">
                <Ionicons name="add-sharp" size={24} color={text} />
                <ThemedText size="md">Add address</ThemedText>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
