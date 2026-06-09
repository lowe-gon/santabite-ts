export function isEmptyObject<T extends Record<string, unknown>>(
  obj: T,
): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return true;
  }

  return false;
}

export function isEmptyArray<T>(arr: T[]): boolean {
  if (arr.length === 0) return true;

  return false;
}
