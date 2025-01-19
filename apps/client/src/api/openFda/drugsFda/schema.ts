import { z } from "zod";

import { ApplicationNumber, OpenFdaApi, OpenFdaApiResult } from "../schema";
import { ROUTES_OF_ADMINISTRATION, MAP_ERROR_TO_ROUTE } from "../constants";

import { NumericDate } from "#utils/schema";

export const Submission = z
  .object({
    // ORIG = Original, SUPPL = Supplement
    submission_type: z.enum(["ORIG", "SUPPL"]),
    submission_number: z.coerce.number().min(1),
    // AP = Final Approval, TA = Tentative Approval
    submission_status: z.enum(["AP", "TA"]).optional(),
    submission_status_date: NumericDate.optional(),
    submission_class_code: z.string().optional(),
    submission_class_code_description: z.string().optional(),
    submission_property_type: z
      .array(z.object({ code: z.literal("Orphan") }).strict())
      .optional(),
    submission_public_notes: z.string().optional(),
    review_priority: z
      .union([
        z.enum(["STANDARD", "PRIORITY", "UNKNOWN", "N/A"]),
        z.enum(["901 REQUIRED", "901 ORDER"]), // Section 901 of FDASIA
      ])
      .optional(),
    application_docs: z
      .array(
        z
          .object({
            id: z.string().regex(/^\d{1,5}$/),
            title: z.string().optional(),
            url: z.string(),
            date: NumericDate,
            type: z.union([
              z.enum([
                "Letter",
                "Label",
                "Review",
                "Federal Register Notice",
                "Medication Guide",
                "Summary Review",
                "Other Important Information from FDA",
                "REMS",
                "Healthcare Professional Sheet",
                "Patient Package Insert",
                "FDA Press Release",
                "Questions and Answers",
                "Patient Information Sheet",
                "Withdrawal Notice",
                "Exclusivity Letter",
                "Dear Health Professional Letter",
                "Other",
              ]),
              z.string().startsWith("Pediatric "),
            ]),
          })
          .strict(),
      )
      .nonempty()
      .optional(),
  })
  .strict();
export type Submission = z.infer<typeof Submission>;

export const Product = z
  .object({
    product_number: z.string().regex(/^\d{3}$/),
    reference_drug: z.preprocess(
      (v) =>
        v === "Yes" ? true
        : v === "No" ? false
        : v,
      z.union([z.boolean(), z.literal("TBD")]),
    ),
    brand_name: z.string(),
    active_ingredients: z.array(
      z
        .object({
          name: z.string(),
          strength: z.union([
            z.string().optional(),
            z.string().startsWith("EQ "),
            z
              .string()
              .endsWith(
                " **Federal Register determination that product was not discontinued or withdrawn for safety or effectiveness reasons**",
              ),
          ]),
        })
        .strict(),
    ),
    reference_standard: z.preprocess(
      (v) =>
        v === "Yes" ? true
        : v === "No" ? false
        : v,
      z.boolean().optional(),
    ),
    // No standard, but may include  `tablet` or `solution for injection`
    dosage_form: z.string(),
    /**
     * While the FDA claims routes of administration are standardized, the
     * dataset (with 104 unique routes) contains many inconsistencies that do
     * not align with the standard. The code identifier is also not provided.
     *
     * @see {@link https://www.fda.gov/industry/structured-product-labeling-resources/route-administration}
     */
    route: z
      .string()
      .toUpperCase()
      .nullable()
      .transform((v) =>
        v !== null ?
          v.split(", ").flatMap((r) => MAP_ERROR_TO_ROUTE[r] ?? r)
        : ["NOT APPLICABLE"],
      )
      .pipe(z.array(z.enum(ROUTES_OF_ADMINISTRATION).catch("OTHER"))),
    marketing_status: z.enum([
      "Prescription",
      "Discontinued",
      "None (Tentative Approval)",
      "Over-the-counter",
    ]),
    /**
     * Corresponds to Section 1.7, Therapeutic Equivalence Evaluations Codes.
     * A* = Therapeutically Equivalent, B* = NOT Therapeutically Equivalent
     *
     * @see {@link https://www.fda.gov/drugs/development-approval-process-drugs/orange-book-preface}
     */
    te_code: z
      .union([
        z.string().regex(/^A(A|N|O|P|T|B)[1-9]?$/),
        z.enum(["BC", "BD", "BE", "BN", "BP", "BR", "BS", "BT", "BX"]),
        z.literal("TBD"),
      ])
      .optional(),
  })
  .strict();
export type Product = z.infer<typeof Product>;

export const OpenFdaDrugsFdaApiResult = OpenFdaApiResult.extend({
  application_number: ApplicationNumber,
  sponsor_name: z.string(),
  submissions: z.array(Submission).nonempty().optional(),
  products: z.array(Product).nonempty().optional(),
});
export type OpenFdaDrugsFdaApiResult = z.infer<typeof OpenFdaDrugsFdaApiResult>;

export const OpenFdaDrugsFdaApi = OpenFdaApi.extend({
  results: z.array(OpenFdaDrugsFdaApiResult),
});
export type OpenFdaDrugsFdaApi = z.infer<typeof OpenFdaDrugsFdaApi>;
