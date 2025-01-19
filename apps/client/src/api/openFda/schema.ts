import { z } from "zod";

import { Unii } from "#utils/schema";

export const ApplicationId = z.object({
  type: z.enum(["NDA", "ANDA", "BLA"]),
  id: z.string().regex(/^\d{6}$/),
});
export type ApplicationId = z.infer<typeof ApplicationId>;

/**
 * While at some endpoints (e.g. `/drug/label.json`) the application number can
 * be other variations of strings (such as /^M\d{3}$/ or /^part\d{3}$/), the
 * application numbers within the Drugs@FDA dataset and API are all strictly of
 * the format /^(NDA|ANDA|BLA)\d{6}$/. These products correspond to drugs
 * approved by the FDA for human use in the U.S. (both prescription and OTC)
 * while excludes those regulated by the CBER, OTC drug monographs, and dietary
 * supplements.
 *
 * Furthermore, the endpoints based on manufacturer-submitted documentation
 * (SPL) such as `/drug/label.json` include products not approved by the FDA.
 *
 * Hence, the application number is restricted only to applications under the
 * NDA (new drug), ANDA (generic drug), and BLA (biological products)
 * categories, which describe drugs that may be approved by the FDA.
 *
 * @see {@link https://www.fda.gov/drugs/how-drugs-are-developed-and-approved/types-applications}
 * @see {@link https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm}
 */
export const ApplicationNumber = z
  .string()
  .regex(/^(NDA|ANDA|BLA)\d{6}$/)
  .transform((v) => ({ type: v.slice(0, -6), id: v.slice(-6) }))
  .pipe(ApplicationId);

/**
 * the `openFDA` object corresponds to standardized fields based on the
 * dataset's existing identifiers.
 *
 * This schema corresponds to the `openFda` object of the Drugs@FDA API, which
 * is the second most minimal schema. The NDC endpoint has fewer fields, but
 * since `package_ndc` and `product_ndc` are searchable fields, that endpoint
 * will not be used.
 *
 * @see {@link https://open.fda.gov/apis/openfda-fields/}
 */
export const OpenFda = z
  .object({
    application_number: z.tuple([ApplicationNumber]).transform(([v]) => v),
    brand_name: z.array(z.string()).nonempty(),
    generic_name: z.array(z.string()).nonempty(),
    manufacturer_name: z.array(z.string()).nonempty(),
    product_ndc: z
      .array(
        z.union([
          z.string().regex(/^\d{5}-\d{3,4}$/),
          z.string().regex(/^\d{4}-\d{4}$/),
        ]),
      )
      .nonempty(),
    product_type: z.array(z.string()).nonempty(),
    route: z.array(z.string()).nonempty().optional(),
    substance_name: z.array(z.string()).nonempty().optional(),
    rxcui: z
      .array(z.string().regex(/^\d{5,7}$/))
      .nonempty()
      .optional(),
    spl_id: z.array(z.string().uuid()).nonempty(),
    spl_set_id: z.array(z.string().uuid()).nonempty(),
    package_ndc: z
      .array(
        z.union([
          z.string().regex(/^\d{5}-\d{3}-\d{2}$/),
          z.string().regex(/^\d{5}-\d{4}-\d{1}$/),
          z.string().regex(/^\d{4}-\d{4}-\d{2}$/),
        ]),
      )
      .nonempty(),
    nui: z
      .array(
        z.union([
          z.string().regex(/^M(\d{7}|\d{9})$/),
          z.string().regex(/^N\d{10}$/),
        ]),
      )
      .nonempty()
      .optional(),
    unii: z.array(Unii).nonempty().optional(),
    pharm_class_cs: z
      .array(
        z.union([
          z.string().endsWith(" [CS]"),
          z.string().endsWith(" [Chemical/Ingredient]"),
        ]),
      )
      .nonempty()
      .optional(),
    pharm_class_epc: z
      .array(z.string().endsWith(" [EPC]"))
      .nonempty()
      .optional(),
    pharm_class_pe: z.array(z.string().endsWith(" [PE]")).nonempty().optional(),
    pharm_class_moa: z
      .array(z.string().endsWith(" [MoA]"))
      .nonempty()
      .optional(),
  })
  .strict();
export type OpenFda = z.infer<typeof OpenFda>;

export const OpenFdaApiResult = z
  .object({
    // Due to the limits of openFDA harmonization, the openFda may be an empty
    // object, which would make all fields optional. Hence, by parsing empty
    // objects as undefined, for non-empty objects, the schema can be strict.
    openfda: z.union([
      z
        .object({})
        .strict()
        .transform(() => undefined),
      OpenFda.optional(),
    ]),
  })
  .strict();
export type OpenFdaApiResult = z.infer<typeof OpenFdaApiResult>;

/**
 * @see {@link https://open.fda.gov/apis/anatomy-of-a-response/}
 */
export const OpenFdaApi = z
  .object({
    meta: z
      .object({
        disclaimer: z.string(),
        terms: z.string().url(),
        license: z.string().url(),
        last_updated: z.string().date(),
        results: z
          .object({
            skip: z.number().min(0),
            // While the limit is 99 in the API, the limit is the number of
            // results in the downloadable datasets.
            limit: z.number().min(1),
            total: z.number().min(1),
          })
          .strict(),
      })
      .strict(),
    results: z.array(OpenFdaApiResult),
  })
  .strict();
export type OpenFdaApi = z.infer<typeof OpenFdaApi>;
