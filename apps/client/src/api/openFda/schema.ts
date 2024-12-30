import { z } from "zod";

// Transforms 8 digit date string YYYYMMDD to YYYY-MM-DD and validates
export const NumericDate = z.coerce
  .string()
  .length(8)
  .transform((v) =>
    v.replace(
      /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})$/,
      "$<year>-$<month>-$<day>",
    ),
  )
  .pipe(z.string().date());

export const Product = z
  .object({
    product_number: z.string().regex(/^\d{3}$/),
    reference_drug: z.enum(["Yes", "No", "TBD"]).optional(),
    brand_name: z.string(),
    active_ingredients: z.array(
      z.object({ name: z.string(), strength: z.string().optional() }).strict(),
    ),
    reference_standard: z
      .enum(["Yes", "No"])
      .transform((v) => (v === "Yes" ? true : false))
      .optional(),
    // No standard, but may include  `tablet` or `solution for injection`
    dosage_form: z.string(),
    // https://www.fda.gov/industry/structured-product-labeling-resources/route-administration
    // Some inconsistencies in dataset with 104 unique routes
    route: z.string().nullable(),
    marketing_status: z.enum([
      "Prescription",
      "Discontinued",
      "None (Tentative Approval)",
      "Over-the-counter",
    ]),
    te_code: z
      .union([z.string().regex(/^[AB][A-Z]\d?$/), z.literal("TBD")])
      .optional(), // https://www.fda.gov/drugs/development-approval-process-drugs/orange-book-preface
  })
  .strict();
export type Product = z.infer<typeof Product>;

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
            id: z.union([z.string().regex(/\d/), z.string().regex(/\d{4,5}/)]),
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
              z.enum([
                "Pediatric Addendum",
                "Pediatric CDTL Review",
                "Pediatric Clinical Pharmacology Addendum",
                "Pediatric Clinical Pharmacology Review",
                "Pediatric DD Summary Review",
                "Pediatric Medical Addendum",
                "Pediatric Medical Secondary Review",
                "Pediatric Memo",
                "Pediatric Reissue",
                "Pediatric Statistical Review",
                "Pediatric Written Request",
                "Pediatric Medical Review",
                "Pediatric Other",
              ]),
              z.string().regex(/^Pediatric (Reissue )?Amendment [1-7]$/),
            ]),
          })
          .strict(),
      )
      .nonempty()
      .optional(),
  })
  .strict();
export type Submission = z.infer<typeof Submission>;

// Supposedly, the Application Number can also be CFR citation for OTC
// Monograph, but none exist in the dataset
// `z.string().regex(/^part\s\d{3}$/)`
export const ApplicationNumber = z
  .string()
  .regex(/^(NDA|ANDA|BLA)\d{6}$/)
  .transform((v) => ({
    type: v.slice(0, -6),
    id: v.slice(-6),
  }))
  .pipe(
    z.object({
      type: z.enum(["NDA", "ANDA", "BLA"]),
      id: z.string().regex(/^\d{6}$/),
    }),
  );
export type ApplicationNumber = z.infer<typeof ApplicationNumber>;

const isValidUnii = (unii: string): boolean => {
  if (unii.length !== 10 || unii[9] === undefined) {
    return false;
  }
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const checkDigit =
    [...unii]
      .slice(undefined, -1)
      .reduce((acc, char) => acc + alphabet.indexOf(char), 0) % alphabet.length;

  return checkDigit === alphabet.indexOf(unii[9]);
};

// Unique Ingredient Identifier (UNII) per ISO 11238
export const Unii = z
  .string()
  .regex(/^[A-Z0-9]{10}$/)
  .refine(isValidUnii);
export type Unii = z.infer<typeof Unii>;

const OpenFda = z
  .object({
    application_number: z
      .array(ApplicationNumber)
      .nonempty()
      .length(1)
      .transform(([v]) => v),
    brand_name: z.array(z.string()).nonempty(),
    generic_name: z.array(z.string()).nonempty(),
    manufacturer_name: z.array(z.string()).nonempty(),
    product_ndc: z.array(z.string()).nonempty(),
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
          z.string().regex(/^\d{4}-\d{4}-\d{2}$/),
          z.string().regex(/^\d{5}-\d{3}-\d{2}$/),
          z.string().regex(/^\d{5}-\d{4}-\d{1}$/),
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

export const OpenFdaResult = z
  .object({
    application_number: ApplicationNumber,
    sponsor_name: z.string(),
    submissions: z.array(Submission).nonempty().optional(),
    products: z.array(Product).nonempty().optional(),
    openfda: z
      .object({})
      // Transform empty object to undefined
      .transform((v) => (Object.keys(v).length === 0 ? undefined : v))
      .optional()
      .pipe(OpenFda.optional()),
  })
  .strict();
export type OpenFdaResult = z.infer<typeof OpenFdaResult>;

export const OpenFdaApi = z.object({
  meta: z
    .object({
      disclaimer: z.string(),
      terms: z.string().url(),
      license: z.string().url(),
      last_updated: z.string().date(),
      results: z
        .object({
          skip: z.number().min(0),
          limit: z.number().min(1),
          total: z.number().min(1),
        })
        .strict(),
    })
    .strict(),
  results: z.array(OpenFdaResult),
});
export type OpenFdaApi = z.infer<typeof OpenFdaApi>;
