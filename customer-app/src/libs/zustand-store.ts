import type { StateStorage } from 'zustand/middleware';
import { deleteValueFor, getValueFor, saveValue } from './secure-storage';

export const ZustandStorage: StateStorage = {
  getItem: async (key: string) => {
    return await getValueFor(key);
  },
  setItem: async (key: string, value: string) => {
    await saveValue(key, value);
  },
  removeItem: async (key: string) => {
    await deleteValueFor(key);
  },
};
