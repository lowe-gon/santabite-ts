import { Platform } from 'react-native';
import type { StateStorage } from 'zustand/middleware';
import { deleteValueFor, getValueFor, saveValue } from './secure-storage';

/**
 * A secure, custom state storage adapter for Zustand middleware.
 * Wraps device-specific native secure storage hooks while safely handling web fallbacks.
 * * @type {StateStorage}
 */
export const tokenCache: StateStorage = {
  /**
   * Retrieves a securely stored token item by its unique key.
   * @param {string} key - The unique identifier for the stored token.
   * @returns {Promise<string | null>} The token value if found, or null if it doesn't exist.
   */
  getItem: async (key: string): Promise<string | null> => {
    return await getValueFor(key);
  },

  /**
   * Persists a token string securely under the specified key (iOS & Android only).
   * Automatically skips execution on web environments to prevent crashing.
   * @param {string} key - The unique key to bind the token value to.
   * @param {string} value - The token or state string payload to persist.
   * @returns {Promise<void | null>} Resolves when saved, or returns null early if executed on web.
   */
  setItem: async (key: string, value: string): Promise<void | null> => {
    if (Platform.OS === 'web') return null;

    return await saveValue(key, value);
  },

  /**
   * Removes a securely stored token and its reference key entirely from device storage.
   * @param {string} key - The unique identifier of the token to delete.
   * @returns {Promise<void>} Resolves when the item is wiped.
   */
  removeItem: async (key: string): Promise<void> => {
    return await deleteValueFor(key);
  },
};
