import type { Arrayable, IterableElement } from "type-fest";

export const MAP_ERROR_TO_ROUTE: Record<
  string,
  Arrayable<RouteOfAdministration>
> = {
  OTIC: "AURICULAR (OTIC)",
  "IV (INFUSION)": "INTRAVENOUS",
  "INTRA-ANAL": "RECTAL",
  CARDIAC: "INTRACARDIAC",
  INTRATRACHEAL: "ENDOTRACHEAL",
  "ORAL SUSPENSION": "ORAL",
  "ORALLY DISINTEGRATING": "ORAL",
  "ORAL-20": "ORAL",
  "ORAL-21": "ORAL",
  "ORAL-28": "ORAL",
  "IM-IV": ["INTRAMUSCULAR", "INTRAVENOUS"],
  INTRAVESICULAR: "INTRAVESICAL",
  BILIARY: "INTRABILIARY",
  INTRAOSSEOUS: "INTRAMEDULLARY",
  INJECTION: "PARENTERAL",
  INJECTABLE: "PARENTERAL",
  IMPLANTATION: "PARENTERAL",
  SPINAL: "INTRASPINAL",
  INHALATION: "RESPIRATORY (INHALATION)",
  "SUBCUTANEOUS LYOPHILIZED POWER": "SUBCUTANEOUS",
  "N/A": "NOT APPLICABLE",
};

type RouteOfAdministration = IterableElement<typeof ROUTES_OF_ADMINISTRATION>;

/**
 * @see {@link https://www.fda.gov/industry/structured-product-labeling-resources/route-administration}
 */
export const ROUTES_OF_ADMINISTRATION = [
  "AURICULAR (OTIC)",
  "BUCCAL",
  "CONJUNCTIVAL",
  "CUTANEOUS",
  "DENTAL",
  "ELECTRO-OSMOSIS",
  "ENDOCERVICAL",
  "ENDOSINUSIAL",
  "ENDOTRACHEAL",
  "ENTERAL",
  "EPIDURAL",
  "EXTRA-AMNIOTIC",
  "EXTRACORPOREAL",
  "HEMODIALYSIS",
  "INFILTRATION",
  "INTERSTITIAL",
  "INTRA-ABDOMINAL",
  "INTRA-AMNIOTIC",
  "INTRA-ARTERIAL",
  "INTRA-ARTICULAR",
  "INTRABILIARY",
  "INTRABRONCHIAL",
  "INTRABURSAL",
  "INTRACAMERAL",
  "INTRACANALICULAR",
  "INTRACARDIAC",
  "INTRACARTILAGINOUS",
  "INTRACAUDAL",
  "INTRACAVERNOUS",
  "INTRACAVITARY",
  "INTRACEREBRAL",
  "INTRACISTERNAL",
  "INTRACORNEAL",
  "INTRACORONAL, DENTAL",
  "INTRACORONARY",
  "INTRACORPORUS CAVERNOSUM",
  "INTRACRANIAL",
  "INTRADERMAL",
  "INTRADISCAL",
  "INTRADUCTAL",
  "INTRADUODENAL",
  "INTRADURAL",
  "INTRAEPICARDIAL",
  "INTRAEPIDERMAL",
  "INTRAESOPHAGEAL",
  "INTRAGASTRIC",
  "INTRAGINGIVAL",
  "INTRAHEPATIC",
  "INTRAILEAL",
  "INTRALESIONAL",
  "INTRALINGUAL",
  "INTRALUMINAL",
  "INTRALYMPHATIC",
  "INTRAMAMMARY",
  "INTRAMEDULLARY",
  "INTRAMENINGEAL",
  "INTRAMUSCULAR",
  "INTRANODAL",
  "INTRAOCULAR",
  "INTRAOMENTUM",
  "INTRAOVARIAN",
  "INTRAPERICARDIAL",
  "INTRAPERITONEAL",
  "INTRAPLEURAL",
  "INTRAPROSTATIC",
  "INTRAPULMONARY",
  "INTRARUMINAL",
  "INTRASINAL",
  "INTRASPINAL",
  "INTRASYNOVIAL",
  "INTRATENDINOUS",
  "INTRATESTICULAR",
  "INTRATHECAL",
  "INTRATHORACIC",
  "INTRATUBULAR",
  "INTRATUMOR",
  "INTRATYMPANIC",
  "INTRAUTERINE",
  "INTRAVASCULAR",
  "INTRAVENOUS",
  "INTRAVENTRICULAR",
  "INTRAVESICAL",
  "INTRAVITREAL",
  "IONTOPHORESIS",
  "IRRIGATION",
  "LARYNGEAL",
  "NASAL",
  "NASOGASTRIC",
  "NOT APPLICABLE",
  "OCCLUSIVE DRESSING TECHNIQUE",
  "OPHTHALMIC",
  "ORAL",
  "OROPHARYNGEAL",
  "OTHER",
  "PARENTERAL",
  "PERCUTANEOUS",
  "PERIARTICULAR",
  "PERIDURAL",
  "PERINEURAL",
  "PERIODONTAL",
  "RECTAL",
  "RESPIRATORY (INHALATION)",
  "RETROBULBAR",
  "SOFT TISSUE",
  "SUBARACHNOID",
  "SUBCONJUNCTIVAL",
  "SUBCUTANEOUS",
  "SUBGINGIVAL",
  "SUBLINGUAL",
  "SUBMUCOSAL",
  "SUBRETINAL",
  "SUPRACHOROIDAL",
  "TOPICAL",
  "TRANSDERMAL",
  "TRANSENDOCARDIAL",
  "TRANSMUCOSAL",
  "TRANSPLACENTAL",
  "TRANSTRACHEAL",
  "TRANSTYMPANIC",
  "URETERAL",
  "URETHRAL",
  "VAGINAL",
] as const;
