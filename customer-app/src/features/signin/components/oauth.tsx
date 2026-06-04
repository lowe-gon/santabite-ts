import ThemedView from '@/components/themed-view';
import AppleButton from './apple-button';
import GoogleButton from './google-button';
import OtherButton from './other-button';

export default function OAuth() {
  return (
    <ThemedView className="bg-transparent">
      <AppleButton />
      <GoogleButton />
      <OtherButton />
    </ThemedView>
  );
}
