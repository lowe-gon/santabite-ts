import ControlledInput from '@/components/controlled-input';
import HapticPressable from '@/components/haptic-pressable';
import useKeyboardAnimation from '@/hooks/use-keyboard-animation';
import { View } from 'react-native';
import useEmailAuth from '../hooks/use-email-auth';

export default function EmailForm() {
  const { form, _onEmailSubmit } = useEmailAuth();

  const { fakeView } = useKeyboardAnimation(200);
  return (
    <>
      <ControlledInput
        control={form.control}
        name="email"
        label="Email address"
        placeholder="juandelacruz@example.com"
      />

      <View className="bottom-safe absolute right-0 left-0">
        <HapticPressable
          label="Next"
          textColor="text-white"
          onPress={form.handleSubmit(_onEmailSubmit)}
        />
      </View>
    </>
  );
}
