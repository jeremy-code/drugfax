import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://dailymed.nlm.nih.gov/dailymed/services/v2",
});
