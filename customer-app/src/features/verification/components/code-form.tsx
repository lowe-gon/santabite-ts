import ControlledInputOTP from '@/components/controlled-input-otp';
import { Pressable, Text } from 'react-native';
import useCodeAuth from '../hooks/use-code-auth';
import useResend from '../hooks/use-resend';

export default function CodeForm() {
  const { form, _onCodeSubmit } = useCodeAuth();
  const { _onResendOTP, countdown, isResendActive } = useResend();

  return (
    <>
      <ControlledInputOTP
        control={form.control}
        name="code"
        onSubmit={form.handleSubmit(_onCodeSubmit)}
      />

      <Pressable
        className="w-40 rounded-2xl bg-sky-500/20 py-4"
        disabled={!isResendActive}
        onPress={_onResendOTP}>
        <Text className="text-center text-sm font-medium text-sky-500">
          {!isResendActive ? countdown : "I didn't get a code"}
        </Text>
      </Pressable>
    </>
  );
}
