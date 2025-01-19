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

  const { counts, maxCount } = values.reduce(
    ({ counts, maxCount }, value) => {
      const count = (counts.get(value) ?? 0) + 1;
      counts.set(value, count);

      return { counts, maxCount: Math.max(maxCount, count) };
    },
    { counts: new Map<T, number>(), maxCount: 0 },
  );

  return (
    Array.from(counts).find(([, count]) => count === maxCount) as [T, number]
  )[0];
};
