export const formatList = (
  list: Iterable<string>,
  {
    locales,
    options,
  }: { locales?: Intl.LocalesArgument; options?: Intl.ListFormatOptions } = {},
): string => new Intl.ListFormat(locales, options).format(list);
