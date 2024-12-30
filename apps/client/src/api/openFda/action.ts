"use server";
import ky from "ky";
import { z } from "zod";

import { OpenFdaApi, OpenFdaResult, Product } from "./schema";

import { env } from "#utils/env";

const api = ky.create({
  prefixUrl: "https://api.fda.gov/drug/",
  headers: {
    Authorization: `Basic ${env.OPENFDA_API_KEY}`,
  },
});

/**
 * Since `fetchMedications` searches by `product.brand_name` or
 * `product.active_ingredients.name`, the `products` field is required.
 */
const OpenFdaApiWithRequiredProducts = OpenFdaApi.extend({
  results: z.array(
    OpenFdaResult.extend({ products: z.array(Product).nonempty() }),
  ),
});

export type Medications = z.infer<typeof OpenFdaApiWithRequiredProducts>;

export const fetchMedicationsAction = async (
  medicationQuery: string,
): Promise<Medications> => {
  return OpenFdaApiWithRequiredProducts.parse(
    await api
      .get("drugsfda.json", {
        searchParams: {
          // Matches behavior of Drugs@FDA search
          search: `products.brand_name:"${medicationQuery}" OR products.active_ingredients.name:"${medicationQuery}"`,
          limit: 99,
        },
      })
      .json(),
  );
};
