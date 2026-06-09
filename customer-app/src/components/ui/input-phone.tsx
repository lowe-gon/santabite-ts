import useThemeColor from '@/hooks/use-theme-color';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@expo/ui/community/bottom-sheet';
import { Entypo, Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import countries from 'world-countries';
import ThemedText from '../themed-text';

type CountryProps = {
  flag: string;
  name: string;
  code: string;
  iso: string;
};

export interface InputPhoneProps {
  value: string;
  onChange: (text: string) => void;
}

export default function InputPhone({ value, onChange }: InputPhoneProps) {
  const text = useThemeColor('text');
  const backgroundColorMuted = useThemeColor('textMuted');

  const countryList = React.useMemo(
    () =>
      countries
        .map(({ name, flag, idd, cca2 }) => ({
          flag,
          name: name.common,
          code: idd.root + (idd.suffixes ? idd.suffixes[0] : ''), // dial code
          iso: cca2,
        }))
        .filter(({ code }) => code !== 'undefined')
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const [selectedCountry, setSelectedCountry] = React.useState<CountryProps | undefined>(
    countryList.find(({ iso }) => iso === value),
  );

  const modalRef = React.useRef<BottomSheetModal>(null);

  const _onOpenModal = React.useCallback(() => {
    modalRef.current?.present();
  }, [modalRef]);

  const _onCloseModal = React.useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  return (
    <>
      <Pressable
        className="bg-surface relative h-14 w-full rounded-2xl px-4"
        onPress={_onOpenModal}>
        <View className="relative flex-1 flex-row items-center justify-between">
          <View className="relative flex-col gap-2">
            <Text className="text-text-muted absolute -top-1.5 text-[.65rem] font-medium">
              Country
            </Text>
            <Text className="text-text mt-3 text-sm font-medium">
              {selectedCountry?.flag} {selectedCountry?.code}
            </Text>
          </View>

          <Entypo name="chevron-small-down" size={24} color={text} />
        </View>
      </Pressable>

      <BottomSheetModal ref={modalRef} snapPoints={['100%']} enablePanDownToClose>
        <BottomSheetView>
          <BottomSheetFlatList
            data={countryList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? backgroundColorMuted : '',
                  },
                ]}
                className="flex-row items-center px-4 py-3"
                onPress={() => {
                  setSelectedCountry(item);
                  onChange(item.code);
                  _onCloseModal();
                }}>
                <View className="w-full flex-row items-center justify-between">
                  <ThemedText size="md">
                    {item.flag} {item.name} ({item.code})
                  </ThemedText>
                  {item.iso === selectedCountry?.iso && (
                    <Feather name="check" size={24} color={'green'} />
                  )}
                </View>
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
