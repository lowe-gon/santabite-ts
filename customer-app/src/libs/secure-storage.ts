import {} from 'expo-secure-store';

import * as SecureStore from 'expo-secure-store';

export async function saveValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(`🔐 Here's your key \n ${key} & value 🔐 \n ${result}`);
    return JSON.parse(result);
  } else {
    console.log('No values stored under that key.');
  }
  return null;
}

export async function deleteValueFor(key: string) {
  console.log(`Values stored deleted under that key \n ${key}`);
  return await SecureStore.deleteItemAsync(key);
}
