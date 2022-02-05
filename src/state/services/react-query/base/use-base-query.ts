import { useQuery, UseQueryOptions } from "react-query";

import { isNullOrEmpty } from "utils/helpers/functional";

import { HTTPMethod, QueryParamsValue } from "./types";

type BaseQueryRequestParams = {
  queryKey: string | unknown[];
  body?: any;
  headers?: Record<string, string>;
  method?: HTTPMethod;
  url: string;
  queryParams?: Record<string, QueryParamsValue>;
};

export default function useBaseQuery<TResponse = any>(
  params: BaseQueryRequestParams,
  options?: UseQueryOptions<TResponse>
) {
  const { queryKey, method, url, body, headers } = params;

  // https://react-query.tanstack.com/reference/useQuery
  return useQuery<TResponse>(
    queryKey,
    () => {
      // here, you can use your own ajax library like axios
      const promise = fetch(url, {
        method: method ?? "GET",
        body: isNullOrEmpty(body) ? undefined : JSON.stringify(body),
        headers,
      }).then((response: Response) => {
        if (response.status < 200 || response.status >= 300) {
          return Promise.reject(response);
        }

        return response.json();
      });

      return promise;
    },
    options
  );
}
