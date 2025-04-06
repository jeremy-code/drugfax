// Only true for English, becomes significantly more complex for other languages
const SUFFIXES = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  // Should never occur in English, included for TypeScript
  other: "th",
  many: "th",
} as const satisfies Record<Intl.LDMLPluralRule, string>;

/**
 * Formats a number as an ordinal number (e.g. 1st, 2nd, 3rd, 4th).
 *
 * @example formatOrdinal(1) // "1st"
 *
 * @see {@link https://en.wikipedia.org/wiki/Ordinal_number}
 */
export const formatOrdinal = (
  n: number,
  {
    locales,
    options,
  }: {
    locales?: Intl.LocalesArgument;
    options?: Omit<Intl.PluralRulesOptions, "type"> & Intl.NumberFormatOptions;
  } = {},
) => {
  const suffix =
    SUFFIXES[
      new Intl.PluralRules(locales, { type: "ordinal", ...options }).select(n)
    ];

  return `${n.toLocaleString(locales, options)}${suffix}` as const;
};
