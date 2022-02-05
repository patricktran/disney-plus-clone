import { AppConfig } from "utils/app-context/types";

import useBaseQuery from "../../../base/use-base-query";

export const useGetEnvConfig = () => {
  return useBaseQuery<AppConfig>({
    queryKey: ["config"],
    url: "/config.json",
  });
};
