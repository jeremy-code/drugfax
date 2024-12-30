/**
 * Sorts the keys of an object alphabetically and returns a new object.
 */
export const sortObjectKeys = <T extends object>(obj: T): T =>
  Object.entries(obj)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .reduce<Record<string, unknown>>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {}) as T;
