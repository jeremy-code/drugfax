import { getParsedType, z } from "zod";

import { dayjs } from "./date";

/**
 * Corresponds to a date in the format YYYYMMDD (or the ISO 8601 format without
 * dashes), which may be a number or string. This schema transforms the 8-digit
 * date string into the ISO 8601 format and then validates using
 * `z.string().date()`.
 */
export const NumericDate = z.coerce
  .string()
  .length(8)
  .regex(/^\d{8}$/)
  .transform((v) =>
    v.replace(
      /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})$/,
      "$<year>-$<month>-$<day>",
    ),
  )
  .pipe(z.string().date());

export const DayjsSchema = z.custom<dayjs.Dayjs>(
  (data) => dayjs.isDayjs(data),
  (input) => ({
    message: `Invalid type. Expected Dayjs, received ${getParsedType(input)}.`,
  }),
);

const BASE_36_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const Unii = z
  .string()
  .length(10)
  .regex(/^[A-Z\d]{10}$/)
  .refine((unii: string) => {
    if (unii.length !== 10 || unii[9] === undefined) {
      return false;
    }

    const checkDigit =
      Array.from(unii)
        .slice(undefined, -1)
        .reduce((acc, char) => acc + BASE_36_ALPHABET.indexOf(char), 0) %
      BASE_36_ALPHABET.length;

    return checkDigit === BASE_36_ALPHABET.indexOf(unii[9]);
  });
