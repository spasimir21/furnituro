function omit<T, TKey extends keyof T>(object: T, keys: TKey[]): Omit<T, TKey> {
  const newObject = { ...object };
  for (const key of keys) delete newObject[key];
  return newObject;
}

export { omit };
