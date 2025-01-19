import { z } from "zod";

import { dayjs } from "#utils/date";
import { DayjsSchema } from "#utils/schema";

export const DailyMedApiRequest = z
  .object({
    pagesize: z.number().int().positive().max(100).optional(),
    page: z.number().int().positive().optional(),
  })
  .strict();

// DailyMed API represents null as the string "null"
const NullString = z.literal("null").transform(() => null);

export const DailyMedApiResponse = z.object({
  metadata: z
    .object({
      db_published_date: z
        .string()
        .transform((arg) =>
          dayjs.tz(
            arg.replace(/ E[SD]?T$/, ""),
            "MMM DD, YYYY hh:mm:ssa",
            "America/New_York",
          ),
        )
        .pipe(DayjsSchema),
      elements_per_page: z.number(),
      current_url: z.string().url(),
      next_page_url: z.union([z.string().url(), NullString]),
      total_elements: z.number().min(0),
      total_pages: z.number().min(0),
      current_page: z.number().min(1),
      previous_page: z.union([z.number().min(1), NullString]),
      previous_page_url: z.union([z.string().url(), NullString]),
      next_page: z.union([z.number().min(2), NullString]),
    })
    .strict(),
});
