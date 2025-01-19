import ky from "ky";

import { env } from "#utils/env";

export const api = ky.create({
  prefixUrl: "https://api.fda.gov/drug",
  headers: { Authorization: `Basic ${env.OPENFDA_API_KEY}` },
});
