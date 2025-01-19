import { api } from "../base/api";

import { DailyMedSplsApiResponse, DailyMedSplsApiRequest } from "./schema";

export const fetchSplsAction = async (params: DailyMedSplsApiRequest) => {
  return DailyMedSplsApiResponse.parse(
    await api
      .get(`spls.json`, { searchParams: DailyMedSplsApiRequest.parse(params) })
      .json(),
  ).data;
};
