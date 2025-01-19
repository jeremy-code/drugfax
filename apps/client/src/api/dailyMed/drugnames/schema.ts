/**
 * @see {@link https://dailymed.nlm.nih.gov/dailymed/webservices-help/v2/drugnames_api.cfm}
 */
import { z } from "zod";

import { DailyMedApiResponse, DailyMedApiRequest } from "../base/schema";

export const DailyMedDrugNamesApiRequest = DailyMedApiRequest.extend({
  drug_name: z.string().optional(),
  name_type: z.enum(["g", "b", "generic", "brand", "both"]).optional(),
  manufacturer: z.string().optional(),
});

export const DailyMedDrugNamesApiResponse = DailyMedApiResponse.extend({
  data: z.array(
    z.object({
      name_type: z.enum(["G", "B"]),
      drug_name: z.string(),
    }),
  ),
});
