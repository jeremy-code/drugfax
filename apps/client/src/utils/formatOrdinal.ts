// Only true for English, becomes significantly more complex for other languages
const SUFFIXES = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  // Should never occur in English, included for TypeScript
  other: "th",
  many: "th",
} satisfies Record<Intl.LDMLPluralRule, string>;

/**
 * Formats a number as an ordinal (e.g. 1st, 2nd, 3rd, 4th).
 *
 * @example formatOrdinal(1) // "1st"
 */
export const formatOrdinal = (
  n: number,
  {
    locales,
    options,
  }: {
    locales?: string | readonly string[];
    options?: Omit<Intl.PluralRulesOptions & Intl.NumberFormatOptions, "type">;
  } = {},
) => {
  const suffix =
    SUFFIXES[
      new Intl.PluralRules(locales, { type: "ordinal", ...options }).select(n)
    ];

  return `${n.toLocaleString(locales, options)}${suffix}`;
};
