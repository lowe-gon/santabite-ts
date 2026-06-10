import React from 'react';

export default function useResend(initialSeconds = 60) {
  const [countdown, setCountdown] = React.useState(initialSeconds);

  const isResendActive = countdown === 0;

  React.useEffect(() => {
    // If countdown hits 0, don't start a timer
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const _onResendOTP = () => {
    if (!isResendActive) return;
    setCountdown(initialSeconds);
    console.log('Resend code');
  };

  return { countdown, isResendActive, _onResendOTP };
}
