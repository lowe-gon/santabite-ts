import useTheme from '@/hooks/use-theme';
import { getCallingCountry } from '@/libs/get-calling-country';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@expo/ui/community/bottom-sheet';
import { Check, ChevronDown, X } from 'lucide-react-native';
import React from 'react';
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Pressable, View, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import worldCountries from 'world-countries';
import ThemedText from '../themed-text';

export interface ICallingCodeInputProps<TFieldValues extends FieldValues> extends PressableProps {
  label: string;
  form: UseFormReturn<TFieldValues>;
  callingCodeField: Path<TFieldValues>;
  callingCountryField: Path<TFieldValues>;
}

export default function CallingCodeInput<TFieldValues extends FieldValues>({
  label,
  className,
  callingCodeField,
  callingCountryField,
  form,
  ...props
}: ICallingCodeInputProps<TFieldValues>) {
  const { text, card } = useTheme();
  const [selectedCountry, setSelectedCountry] = React.useState(getCallingCountry('PH'));
  const modalRef = React.useRef<BottomSheetModal>(null);

  const countries = React.useMemo(
    () =>
      worldCountries
        .map(({ name, flag, idd, cca2 }) => ({
          flag,
          name: name.common,
          code: idd.root + (idd.suffixes ? idd.suffixes[0] : ''), // dial code
          iso: cca2,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  React.useEffect(() => {
    if (!selectedCountry) return;
    form.setValue(
      callingCountryField,
      selectedCountry.iso as PathValue<TFieldValues, Path<TFieldValues>>,
    );
    form.setValue(
      callingCodeField,
      selectedCountry.code as PathValue<TFieldValues, Path<TFieldValues>>,
    );
  }, [selectedCountry, form, callingCodeField, callingCountryField]);

  const _onPickCallingCountry = React.useCallback(
    (data: (typeof countries)[0]) => {
      form.setValue(callingCountryField, data.iso as PathValue<TFieldValues, Path<TFieldValues>>);
      form.setValue(callingCodeField, data.code as PathValue<TFieldValues, Path<TFieldValues>>);

      setSelectedCountry(data);
      modalRef.current?.close();
    },
    [form, callingCodeField, callingCountryField],
  );

  return (
    <>
      <Pressable
        {...props}
        className={twMerge('bg-card relative h-14 w-full rounded-2xl px-4', className)}
        onPress={() => modalRef.current?.present()}>
        <ThemedText className="text-text-muted absolute top-1.5 left-4 text-xs font-medium">
          {label}
        </ThemedText>

        <View className="mt-3 w-full flex-1 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <ThemedText>{selectedCountry.flag}</ThemedText>
            <ThemedText>{selectedCountry.code}</ThemedText>
          </View>
          <ChevronDown size={16} color={text} />
        </View>
      </Pressable>

      {/* Modal */}
      <BottomSheetModal ref={modalRef} snapPoints={['90%']}>
        <BottomSheetView style={{ flex: 1 }}>
          <BottomSheetView
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ThemedText size="title">Countries</ThemedText>
            {/* Close Modal */}
            <Pressable
              onPress={() => modalRef.current?.close()}
              className="bg-card rounded-full p-2.5">
              <X size={20} color={text} />
            </Pressable>
          </BottomSheetView>
          {/* Country List */}
          <BottomSheetFlatList
            data={countries}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? card : '',
                  },
                ]}
                className="w-full flex-row items-center justify-between px-5 py-3"
                onPress={() => _onPickCallingCountry(item)}>
                <View className="flex-row items-center gap-3">
                  <ThemedText size="subtitle">{item.flag}</ThemedText>
                  <ThemedText size="subtitle" numberOfLines={1} className="max-w-40">
                    {item.name}
                  </ThemedText>
                  <ThemedText size="subtitle" className="flex-1">
                    {item.code}
                  </ThemedText>
                  {selectedCountry.name === item.name && <Check color="green" />}
                </View>
              </Pressable>
            )}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
