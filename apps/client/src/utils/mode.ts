/**
 * Returns the most frequently occurring value in an array. If there are
 * multiple modes, it returns the first one.
 *
 * @see {@link https://en.wikipedia.org/wiki/Mode_(statistics)}
 */
export const mode = <T>(values: T[]) => {
  if (values.length === 0) {
    return undefined;
  }

  const counts = values.reduce(
    (acc, value) => acc.set(value, (acc.get(value) ?? 0) + 1),
    new Map<T, number>(),
  );
  const maxCount = Math.max(...counts.values());

  return (
    Array.from(counts).find(([, count]) => count === maxCount) as [T, number]
  )[0];
};
