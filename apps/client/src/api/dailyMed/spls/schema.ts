import { z } from "zod";

import { DailyMedApiResponse, DailyMedApiRequest } from "../base/schema";
import { MARKETING_CATEGORY_CODES, DEA_SCHEDULE_CODES } from "../constants";

import { DayjsSchema, Unii } from "#utils/schema";
import { dayjs } from "#utils/date";

export const DailyMedSplsApiRequest = DailyMedApiRequest.extend({
  application_number: z
    .union([z.string(), z.string().regex(/^(ANADA|NDA|ANDA|BLA)\d{6}$/)])
    .optional(),
  boxed_warning: z.boolean().optional(),
  dea_schedule_code: z.enum(DEA_SCHEDULE_CODES).optional(),
  doctype: z.string().optional(),
  drug_class_code: z
    .string()
    .regex(/^N\d{10}$/)
    .optional(),
  drug_class_coding_system: z.literal("2.16.840.1.113883.3.26.1.5").optional(),
  drug_name: z.string().optional(),
  name_type: z.enum(["g", "generic", "b", "brand", "both"]).optional(),
  labeler: z.string().optional(),
  marketing_category_code: z.enum(MARKETING_CATEGORY_CODES).optional(),
  ndc: z.string().optional(),
  published_date: z.string().date().optional(),
  published_date_comparison: z
    .enum(["lt", "lte", "gt", "gte", "eq"])
    .optional(),
  rxcui: z
    .string()
    .regex(/\d{5,7}/)
    .optional(),
  setid: z.string().uuid().optional(),
  unii_code: Unii.optional(),
});
export type DailyMedSplsApiRequest = z.infer<typeof DailyMedSplsApiRequest>;

export const DailyMedSplsApiResponse = DailyMedApiResponse.extend({
  data: z.array(
    z.object({
      spl_version: z.coerce.number(),
      published_date: z
        .string()
        .transform((arg) => dayjs(arg, "MMM DD, YYYY", true))
        .pipe(DayjsSchema),
      setid: z.string().uuid(),
      title: z.string(),
    }),
  ),
});
