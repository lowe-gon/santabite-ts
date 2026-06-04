import ThemedText from '@/components/themed-text';
import { Pressable } from 'react-native';
import useResendOTP from '../hooks/use-resend-otp';

export default function ResendButton() {
  const { countdown, isResendActive, _onResendOTP } = useResendOTP();

  return (
    <Pressable
      className="bg-primary disabled:bg-primary/80 h-14 w-32 flex-row items-center justify-center rounded-2xl"
      disabled={!isResendActive}
      onPress={_onResendOTP}>
      <ThemedText size="smallBold">{!isResendActive ? countdown : 'Resend code'}</ThemedText>
    </Pressable>
  );
}
