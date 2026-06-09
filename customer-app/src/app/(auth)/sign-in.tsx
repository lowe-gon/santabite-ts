import ThemedText from '@/components/themed-text';
import AppleButton from '@/features/signin/components/apple-button';
import Divider from '@/features/signin/components/divider';
import FacebookButton from '@/features/signin/components/facebook-button';
import GoogleButton from '@/features/signin/components/google-button';
import OtherButton from '@/features/signin/components/other-button';
import PhoneForm from '@/features/signin/components/phone-form';
import useColorScheme from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native';

export default function SignInScreen() {
  const colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center bg-sky-500">
        {/* Scroll Animation */}
        <View className="w-full flex-1" />
        <View className="bg-background relative w-full px-4 py-6">
          <LinearGradient
            colors={[
              'transparent',
              colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            ]}
            style={{
              height: 70,
              position: 'absolute',
              left: 0,
              right: 0,
              top: -70,
            }}
          />
          <View className="gap-3">
            {/* Welcome Text */}
            <ThemedText size="lg" className="font-righteous-regular text-center">
              Welcome to SantaBite
            </ThemedText>

            {/* Form */}
            <PhoneForm />
            <Divider />

            {/* CTA */}
            {Platform.OS === 'ios' && <AppleButton />}
            <GoogleButton />
            <FacebookButton />
            <OtherButton />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
