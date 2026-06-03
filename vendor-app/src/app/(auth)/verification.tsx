import BackButton from '@/components/back-button';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';
import CodeForm from '@/features/verification/components/code-form';
import ResendButton from '@/features/verification/components/resend-button';
import { router, useLocalSearchParams } from 'expo-router';
import { Keyboard, Text, TouchableWithoutFeedback } from 'react-native';

export default function VerificationScreen() {
  const { identifier } = useLocalSearchParams<{ identifier: string }>();

  const isPhoneIdentifier = identifier === 'phone';

  return (
    <>
      <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
        <ThemedView className="bg-background flex-1">
          <BackButton router={() => router.replace('/(auth)/sign-up')} />

          {/* Content */}

          <ThemedView spacing="sm" className="pt-safe mt-20 flex-1 bg-transparent px-4">
            <ThemedText className="text-3xl font-bold">
              Verify {isPhoneIdentifier ? 'phone number' : 'email address'}
            </ThemedText>
            <ThemedText className="text-text-muted text-base font-medium">
              We sent a code to{' '}
              <Text className="text-text-main">
                {isPhoneIdentifier ? '+63179956944' : 'juandelacruz@example.com'}
              </Text>
              . Please check your {isPhoneIdentifier ? 'messages' : 'email'} and enter the code
              below.
            </ThemedText>
            {/* Form */}
            <CodeForm />

            {/* Resend Button */}
            <ResendButton />
          </ThemedView>
        </ThemedView>
      </TouchableWithoutFeedback>
    </>
  );
}
