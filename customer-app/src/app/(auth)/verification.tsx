import ThemedText from '@/components/themed-text';
import CodeForm from '@/features/verification/components/code-form';
import useThemeColor from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import parsePhoneNumber, { type CountryCode } from 'libphonenumber-js';
import React from 'react';
import { Keyboard, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { withUniwind } from 'uniwind';

const ThemedGlassView = withUniwind(GlassView);

export default function VerificationScreen() {
  const { identifier, email, phone, callingCountry } = useLocalSearchParams<{
    identifier: string;
    email: string;
    phone: string;
    callingCountry: string;
  }>();

  const text = useThemeColor('text');
  const router = useRouter();

  const isPhoneIdentifier = identifier === 'phone';

  const _onBackRoute = React.useCallback(() => {
    const path: Href = isPhoneIdentifier ? '/(auth)/sign-in' : '/(auth)/sign-up';
    router.replace(path);
  }, [isPhoneIdentifier, router]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background flex-1 px-4">
        {/* Back Button */}
        <ThemedGlassView
          className="top-safe absolute left-4 size-12 overflow-hidden rounded-full"
          isInteractive>
          <Pressable className="flex-1 items-center justify-center" onPress={_onBackRoute}>
            <Ionicons name="chevron-back" size={24} color={text} />
          </Pressable>
        </ThemedGlassView>

        {/* Content */}
        <View className="pt-safe mt-16 gap-3">
          <ThemedText className="text-3xl leading-tight font-extrabold">
            Verify {isPhoneIdentifier ? 'phone number' : 'email address'}
          </ThemedText>
          <ThemedText size="md" variant="muted" className="leading-px font-medium">
            We sent a {isPhoneIdentifier ? 'text' : 'mail'} with a code to{' '}
            <ThemedText size="md" className="leading-px font-medium">
              {isPhoneIdentifier
                ? parsePhoneNumber(phone, callingCountry as CountryCode)?.formatInternational()
                : email}
            </ThemedText>
            . Please check your {isPhoneIdentifier ? 'messages' : 'email'} and enter the code below.
          </ThemedText>

          {/* Form */}
          <CodeForm />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
