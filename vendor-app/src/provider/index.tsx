import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener, SafeAreaProvider } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import ClerkProvider from './clerk-provider';

interface IAppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: IAppProviderProps) {
  return (
    <ClerkProvider>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <SafeAreaListener
            onChange={({ insets }) => {
              Uniwind.updateInsets(insets);
            }}>
            {children}
          </SafeAreaListener>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
