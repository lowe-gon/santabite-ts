import HapticPressable from '@/components/haptic-pressable';
import ThemedText from '@/components/themed-text';
import useThemeColor from '@/hooks/use-theme-color';
import { BottomSheetModal, BottomSheetView } from '@expo/ui/community/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import React from 'react';
import { Pressable, View } from 'react-native';
import { withUniwind } from 'uniwind';
import AppleButton from './apple-button';
import EmailButton from './email-button';
import FacebookButton from './facebook-button';
import GoogleButton from './google-button';
import GuestButton from './guest-button';

const ThemedGlassView = withUniwind(GlassView);

export default function OtherButton() {
  const text = useThemeColor('text');
  const modalRef = React.useRef<BottomSheetModal>(null);

  const _onOpenModal = React.useCallback(() => {
    modalRef.current?.present();
  }, [modalRef]);

  const _onCloseModal = React.useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  return (
    <>
      <HapticPressable
        variant="ghost"
        label="Other options"
        textColor="text-text"
        onPress={_onOpenModal}
      />

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
                <Pressable onPress={_onCloseModal}>
                  <Ionicons name="close" size={24} color={text} />
                </Pressable>
              </ThemedGlassView>
            </View>
            <ThemedText className="text-3xl font-extrabold">
              Log in or create a Santabite account
            </ThemedText>

            <View className="gap-2">
              <AppleButton />
              <GoogleButton />
              <FacebookButton />
              <EmailButton />
              <GuestButton />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
