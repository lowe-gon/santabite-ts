import ThemedText from '@/components/themed-text';
import EmailForm from '@/features/signup/compenents/email-form';
import useThemeColor from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { router } from 'expo-router';
import { Keyboard, Platform, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { withUniwind } from 'uniwind';

const ThemedGlassView = withUniwind(GlassView);

export default function SignUpScreen() {
  const text = useThemeColor('text');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="bg-background flex-1 px-4">
        {/* Back Button */}
        <ThemedGlassView
          className="top-safe absolute left-4 size-14 overflow-hidden rounded-full"
          isInteractive>
          <Pressable
            className="flex-1 items-center justify-center"
            onPress={() => router.replace('/(auth)/sign-in')}>
            <Ionicons name="chevron-back" size={24} color={text} />
          </Pressable>
        </ThemedGlassView>

        {/* Content */}
        <View className="relative flex-1 flex-col justify-center gap-2">
          <ThemedText className="text-4xl leading-tight font-extrabold">
            Log in easily without a password!
          </ThemedText>
          <ThemedText size="md" variant="muted">
            We&apos;ll get going with Santabite in no time.
          </ThemedText>

          {/* Form */}
          <EmailForm />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
