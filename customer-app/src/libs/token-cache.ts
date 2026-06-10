import { Platform } from 'react-native';
import type { StateStorage } from 'zustand/middleware';
import { deleteValueFor, getValueFor, saveValue } from './secure-storage';

export const tokenCache: StateStorage = {
  getItem: async (key: string) => {
    return await getValueFor(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') return null;

    return await saveValue(key, value);
  },
  removeItem: async (key: string) => {
    return await deleteValueFor(key);
  },
};
