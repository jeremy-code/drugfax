const cache = new Map<string, Intl.ListFormat>();

export const formatList = (
  list: Parameters<Intl.ListFormat["format"]>[0],
  {
    locales,
    options,
  }: { locales?: Intl.LocalesArgument; options?: Intl.ListFormatOptions } = {},
): string => {
  const key = JSON.stringify({ locales, options });
  const listFormatter = cache.get(key) ?? new Intl.ListFormat(locales, options);

  if (!cache.has(key)) {
    cache.set(key, listFormatter);
  }

  return listFormatter.format(list);
};
