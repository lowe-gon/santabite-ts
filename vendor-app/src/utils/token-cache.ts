import type { TokenCache } from '@clerk/expo';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export const tokenCache: TokenCache = {
  saveToken: async (key: string, token: string) => {
    await setItemAsync(key, token);
  },
  getToken: async (key: string) => {
    await getItemAsync(key);
  },
  clearToken: async (key: string) => {
    await deleteItemAsync(key);
  },
};
