"use server";
import { z } from "zod";

import { api } from "../api";
import { ApplicationId } from "../schema";

import {
  OpenFdaDrugsFdaApiResult,
  OpenFdaDrugsFdaApi,
  Product,
} from "./schema";

/**
 * Since `fetchDrugsAction` searches by `product.brand_name` or
 * `product.active_ingredients.name`, the `products` field is required.
 */
const Drug = OpenFdaDrugsFdaApiResult.extend({
  products: z.array(Product).nonempty(),
});
export type Drug = z.infer<typeof Drug>;

export const fetchDrugAction = async ({
  type,
  id,
}: ApplicationId): Promise<Drug> => {
  return OpenFdaDrugsFdaApi.extend({
    results: z.tuple([Drug]).transform(([drug]) => drug),
  }).parse(
    await api
      .get("drugsfda.json", {
        searchParams: { search: `application_number:"${type}${id}"` },
      })
      .json(),
  ).results;
};

export const fetchDrugsAction = async (drugQuery: string): Promise<Drug[]> =>
  OpenFdaDrugsFdaApi.extend({ results: z.array(Drug) })
    .parse(
      await api
        .get("drugsfda.json", {
          searchParams: {
            // Aligns with Drugs@FDA search behavior
            search: [
              `products.brand_name:"${drugQuery}"`,
              "OR",
              `products.active_ingredients.name:"${drugQuery}"`,
            ].join(" "),
            limit: 99,
          },
        })
        .json(),
    )
    .results.map((drug) => ({
      ...drug,
      // Filtering out non-prescription drugs for now. If necessary, this can be
      // removed to maintain parity with Drugs@FDA search.
      products: drug.products.filter(
        ({ marketing_status }) => marketing_status === "Prescription",
      ),
    }))
    // Assertion is necessary because TS doesn't know products is now nonempty
    .filter(({ products }) => products.length > 0) as Drug[];
