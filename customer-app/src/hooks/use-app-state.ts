import { focusManager } from '@tanstack/react-query';
import React from 'react';
import { AppState, Platform, type AppStateStatus } from 'react-native';

export default function useAppState() {
  const _onAppStateChange = React.useCallback((status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }, []);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', _onAppStateChange);

    return () => subscription.remove();
  }, [_onAppStateChange]);
}
