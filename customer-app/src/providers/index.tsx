import { BottomSheetModalProvider } from '@expo/ui/community/bottom-sheet';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaListener, SafeAreaProvider } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

export default function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <KeyboardProvider>
          <SafeAreaProvider
            style={{
              flex: 1,
            }}>
            <SafeAreaListener
              onChange={({ insets }) => {
                Uniwind.updateInsets(insets);
              }}>
              {children}
            </SafeAreaListener>
          </SafeAreaProvider>
        </KeyboardProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
