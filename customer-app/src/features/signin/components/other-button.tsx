import ThemedText from '@/components/themed-text';
import { useAuthStore } from '@/store/auth-store';
import { BottomSheetModal, BottomSheetView } from '@expo/ui/community/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AppleButton from './apple-button';
import GoogleButton from './google-button';

export default function OtherButton() {
  const modalRef = React.useRef<BottomSheetModal>(null);
  const onSaveGuest = useAuthStore((state) => state.onSaveGuest);

  const _onGuest = React.useCallback(() => {
    onSaveGuest(true);
  }, [onSaveGuest]);

  return (
    <>
      <Pressable
        className="h-14 flex-row items-center justify-center rounded-2xl"
        onPress={() => modalRef.current?.present()}>
        <Text className="text-text-main text-sm font-semibold">Other</Text>
      </Pressable>

      <BottomSheetModal ref={modalRef} snapPoints={['40%']} enablePanDownToClose={true}>
        <BottomSheetView
          style={{
            flex: 1,
            paddingTop: 24,
            paddingHorizontal: 24,
          }}>
          <View className="flex-1 gap-3">
            <ThemedText size="title" className="font-extrabold">
              Login with Santabite
            </ThemedText>
            {/* Oauth */}
            <AppleButton />
            <GoogleButton />

            {/* Email */}
            <Pressable
              className="bg-card h-14 flex-row items-center justify-center rounded-2xl"
              onPress={() => {
                modalRef.current?.close();
                router.replace('/(auth)/sign-up');
              }}>
              <View className="absolute top-1/2 left-5 -translate-y-1/2">
                <AntDesign name="mail" size={22} />
              </View>
              <Text className="text-text-main text-sm font-semibold">Continue with Email</Text>
            </Pressable>

            {/* Guest */}
            <Pressable
              className="h-14 flex-row items-center justify-center rounded-2xl"
              onPress={_onGuest}>
              <Text className="text-text-main text-sm font-semibold">Continue as a Guest</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
