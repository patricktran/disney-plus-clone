import AppContext from "utils/app-context";

import useBaseQuery from "../../../base/use-base-query";

import { Hero } from "./types";

export const useGetHeroes = () => {
  return useBaseQuery<Hero[]>({
    queryKey: ["heroes"],
    url: `${AppContext.Config.api.disneyBaseUrl}/heroes`,
  });
};
