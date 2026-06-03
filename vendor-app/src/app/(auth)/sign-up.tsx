import BackButton from '@/components/back-button';
import ControlledInput from '@/components/controlled-input';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';
import useEmailAuth from '@/features/signup/hooks/use-email-auth';
import useKeyboardAnimation from '@/hooks/use-keyboard-animation';
import { router } from 'expo-router';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

export default function SignUpScreen() {
  const { fakeViewStyle } = useKeyboardAnimation();

  const { form, _onEmailSubmit } = useEmailAuth();

  return (
    <>
      <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
        <ThemedView className="bg-background flex-1">
          <BackButton router={() => router.replace('/(auth)/sign-in')} />

          {/* Content */}

          <ThemedView spacing="sm" className="flex-1 justify-center bg-transparent px-4">
            <ThemedText className="text-3xl font-bold">
              Login in easily without a password!
            </ThemedText>
            <ThemedText className="text-text-muted text-base font-medium">
              We&apos;ll get you going with Santabite in no time.
            </ThemedText>
            <ControlledInput
              control={form.control}
              keyboardType="email-address"
              name="email"
              label="Email"
              placeholder="juandelacruz@example.com"
            />
          </ThemedView>
          <ThemedView className="pb-safe bg-transparent px-4">
            <Pressable
              onPress={form.handleSubmit(_onEmailSubmit)}
              className="bg-primary rounded-2xl py-4">
              <ThemedText size="smallBold" className="text-center">
                Continue
              </ThemedText>
            </Pressable>
          </ThemedView>
          <Animated.View style={fakeViewStyle} />
        </ThemedView>
      </TouchableWithoutFeedback>
    </>
  );
}
