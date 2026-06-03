import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';
import Divider from '@/features/signin/components/divider';
import OAuth from '@/features/signin/components/oauth';
import PhoneForm from '@/features/signin/components/phone-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function SignInScreen() {
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ThemedView className="bg-primary flex-1">
        {/* Logo */}
        <ThemedView className="flex-[1.3_0_auto] bg-transparent" />

        {/* Content */}
        <ThemedView spacing="md" className="flex-2 rounded-t-4xl px-4 pt-6">
          <ThemedView className="bg-transparent">
            <ThemedText size="title" className="text-center">
              Welcome Back
            </ThemedText>
            <ThemedText size="subtitle" color="muted" className="text-center">
              Sign to continue
            </ThemedText>
          </ThemedView>

          {/* Phone Form */}
          <PhoneForm />

          {/* Divider */}
          <Divider />

          {/* CTA - OAuth Buttons */}
          <OAuth />
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
