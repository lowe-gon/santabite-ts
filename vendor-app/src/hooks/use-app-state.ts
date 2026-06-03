import { useAuthStore } from '@/store/auth-store';
import React from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export default function useAppState() {
  const appStateRef = React.useRef<AppStateStatus>(AppState.currentState);

  React.useEffect(() => {
    const subscrition = AppState.addEventListener('change', (nextAppState) => {
      if (appStateRef.current === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App is closing/going to background. Clearing storage...');
        useAuthStore.persist.clearStorage();
      }

      appStateRef.current = nextAppState;
    });

    return () => {
      subscrition.remove();
    };
  }, []);
}
