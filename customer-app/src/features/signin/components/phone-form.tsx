import ControlledInput from '@/components/controlled-input';
import ControlledInputPhone from '@/components/controlled-input-phone';
import HapticPressable from '@/components/haptic-pressable';
import useKeyboardAnimation from '@/hooks/use-keyboard-animation';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import usePhoneAuth from '../hooks/use-phone-auth';

export default function PhoneForm() {
  const [value, setValue] = React.useState('');
  const { fakeView } = useKeyboardAnimation(10);

  const { form, _onPhoneAuthSubmit } = usePhoneAuth();

  console.log(form.watch('callingCountry'));

  return (
    <>
      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <View className="w-30">
            <ControlledInputPhone control={form.control} name="callingCountry" />
          </View>
          <View className="flex-1">
            <ControlledInput
              control={form.control}
              name="phoneNumber"
              label="Phone number"
              keyboardType="decimal-pad"
              isRequired
            />
          </View>
        </View>

        <Animated.View
          style={{
            visibility: 'hidden',
          }}>
          <HapticPressable
            label="Continue"
            textColor="text-white"
            onPress={form.handleSubmit(_onPhoneAuthSubmit)}
          />
        </Animated.View>

        <Animated.View style={fakeView} />
      </View>
    </>
  );
}
