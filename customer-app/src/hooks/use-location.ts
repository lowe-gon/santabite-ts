import {
  checkLocationPermission,
  requestAndGeoLocation,
  type RequestAndGeoLocationProps,
} from '@/libs/location';
import React from 'react';

export default function useLocation() {
  const [state, setState] = React.useState<RequestAndGeoLocationProps>({
    error: null,
    location: null,
    status: '',
  });

  React.useEffect(() => {
    (async () => {
      const status = await checkLocationPermission();
      setState((prev) => ({
        ...prev,
        status,
      }));
    })();
  }, []);

  const _onRequestLocation = React.useCallback(async () => {
    try {
      const response = await requestAndGeoLocation();

      if (!response) return;

      setState(response);
    } catch (err) {
      setState({
        location: null,
        status: 'denied',
        error: err instanceof Error ? err.message : 'Failed to get location',
      });
    }
  }, []);

  return {
    ...state,
    _onRequestLocation,
  };
}
