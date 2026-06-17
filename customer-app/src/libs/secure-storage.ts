import {} from 'expo-secure-store';

import * as SecureStore from 'expo-secure-store';

/**
 * Encrypts and securely stores a string value associated with a specific key.
 * * @param {string} key - The unique identifier used to reference the stored item.
 * @param {string} value - The string payload to serialize and securely store.
 * @returns {Promise<void>} A promise that resolves when the item is successfully saved.
 */
export async function saveValue(key: string, value: string): Promise<void> {
  return await SecureStore.setItemAsync(key, JSON.stringify(value));
}

/**
 * Retrieves and deserializes a securely stored string value by its key.
 * * @param {string} key - The unique identifier of the item to retrieve.
 * @returns {Promise<string | null>} The parsed string value if found, or null if it doesn't exist.
 */
export async function getValueFor(key: string): Promise<string | null> {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(`🔐 Here's your key \n ${key} & value 🔐 \n ${result}`);
    return JSON.parse(result);
  } else {
    console.log('No values stored under that key.');
  }
  return null;
}

/**
 * Deletes a securely stored value and its associated key from the device storage.
 * * @param {string} key - The unique identifier of the item to delete.
 * @returns {Promise<void>} A promise that resolves when the item is successfully removed.
 */
export async function deleteValueFor(key: string): Promise<void> {
  console.log(`Values stored deleted under that key \n ${key}`);
  return await SecureStore.deleteItemAsync(key);
}
