import ControlledInputOTP from '@/components/controlled-input-otp';
import ThemedView from '@/components/themed-view';
import useVerificationAuth from '../hooks/use-verification-auth';

export default function CodeForm() {
  const { form, _onVerificationSubmit } = useVerificationAuth();

  return (
    <>
      <ThemedView className="w-full flex-row items-center gap-3">
        <ControlledInputOTP
          control={form.control}
          name="code"
          onSubmit={form.handleSubmit(_onVerificationSubmit)}
        />
      </ThemedView>
    </>
  );
}
