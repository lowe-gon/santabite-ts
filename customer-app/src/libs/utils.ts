/**
 * Checks whether an object is completely empty (has no enumerable own properties).
 * * @template T - A type extending a standard string-keyed record object.
 * @param {T} obj - The object to evaluate.
 * @returns {boolean} True if the object has zero keys, otherwise false.
 */
export function isEmptyObject<T extends Record<string, unknown>>(obj: T): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false; // Found a key, so it's NOT empty
    }
  }

  return true; // No keys found, it is empty
}

/**
 * Checks whether an array is completely empty.
 * * @template T - The type of items contained within the array.
 * @param {T[]} arr - The array to evaluate.
 * @returns {boolean} True if the array length is 0, otherwise false.
 */
export function isEmptyArray<T>(arr: T[]): boolean {
  return arr.length === 0; // Directly returns a clean boolean evaluation
}

/**
 * Delay function
 * @param {number} t A timer parameter
 */
export async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
