export const FDA_DOCUMENT_TYPES = [
  "98075-5",
  "77647-6",
  "104091-4",
  "86445-4",
  "53409-9",
  "81203-2",
  "60684-8",
  "58474-8",
  "103573-2",
  "104087-2",
  "104086-4",
  "104089-8",
  "104088-0",
  "103572-4",
  "105122-6",
  "104090-6",
  "58476-3",
  "78744-0",
  "70097-1",
  "51725-0",
  "89600-1",
  "99282-6",
  "71743-9",
  "75031-5",
  "34390-5",
  "34391-3",
  "72090-4",
  "71446-9",
  "77648-4",
  "93723-5",
  "63417-0",
  "93372-1",
  "60685-5",
  "73815-3",
  "82353-4",
  "64124-1",
  "77288-9",
  "101437-2",
  "53407-3",
  "53408-1",
  "53406-5",
  "66105-8",
  "55439-4",
  "58475-5",
  "53410-7",
  "53405-7",
  "69968-6",
  "81204-0",
  "72871-7",
  "51726-8",
  "50577-6",
  "69403-4",
  "50576-8",
  "50574-3",
  "50573-5",
  "53411-5",
  "60683-0",
  "50578-4",
  "69404-2",
  "78745-7",
  "85274-9",
  "82351-8",
  "60682-2",
  "53404-0",
  "50575-0",
  "50572-7",
  "50571-9",
  "75030-7",
  "77573-4",
] as const;

// https://www.fda.gov/industry/structured-product-labeling-resources/spl-dea-schedule
export const DEA_SCHEDULE_CODES = [
  "none", // Not scheduled
  "C48672", // CI
  "C48675", // CII
  "C48676", // CIII
  "C48677", // CIV
  "C48679", // CV
] as const;

// https://www.fda.gov/industry/structured-product-labeling-resources/marketing-category
export const MARKETING_CATEGORY_CODES = [
  "C73583", // ANADA
  "C73584", // ANDA
  "C73585", // BLA
  "C73626", // Bulk ingredient
  "C73588", // Conditional NADA
  "C80438", // Exempt device
  "C92556", // Legally Marketed Unapproved New Animal Drugs for Minor Species
  "C73593", // NADA
  "C73594", // NDA
  "C73605", // NDA authorized generic
  "C200263", // OTC Monograph Drug
  "C80441", // Premarket Application
  "C80442", // Premarket Notification
] as const;
