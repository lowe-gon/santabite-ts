import ControlledInput from '@/components/controlled-input';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';
import CallingCodeInput from '@/components/ui/calling-code-input';
import usePhoneAuth from '@/features/signin/hooks/use-phone-auth';
import { Pressable } from 'react-native';

export default function PhoneForm() {
  const { form, _onPhoneAuthSubmit } = usePhoneAuth();

  return (
    <ThemedView className="bg-transparent">
      <ThemedView className="bg-transparent" direction="row">
        <ThemedView className="w-28 bg-transparent">
          <CallingCodeInput
            form={form}
            callingCodeField="callingCode"
            callingCountryField="callingCountry"
            label="Country"
          />
        </ThemedView>
        <ThemedView className="flex-1 bg-transparent">
          <ControlledInput control={form.control} name="phone" label="Phone number" isRequired />
        </ThemedView>
      </ThemedView>
      <Pressable
        className="bg-primary rounded-2xl py-4"
        onPress={form.handleSubmit(_onPhoneAuthSubmit)}>
        <ThemedText className="text-center text-white" size="smallBold">
          Continue
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
