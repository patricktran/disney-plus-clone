import { useMutation, UseMutationOptions } from "react-query";

import { isNullOrEmpty } from "utils/helpers/functional";

import { HTTPMethod, QueryParamsValue } from "./types";

type BaseMutationRequestParams = {
  body: any;
  headers?: Record<string, string>;
  method: HTTPMethod;
  queryParams?: Record<string, QueryParamsValue>;
  url: string;
};

export default function useBaseMutation<
  TResponse = any,
  ErrorResponse = Error,
  RequestParams = any
>(
  mutationFn: (params: RequestParams) => BaseMutationRequestParams,
  options?: UseMutationOptions<TResponse, ErrorResponse, RequestParams>
) {
  return useMutation<TResponse, ErrorResponse, RequestParams>((params) => {
    const { body, headers, method, url } = mutationFn(params);

    const promise = fetch(url, {
      method: method ?? "POST",
      body: isNullOrEmpty(body) ? undefined : JSON.stringify(body),
      headers,
    }).then((response: Response) => {
      if (response.status < 200 || response.status >= 300) {
        return Promise.reject(response);
      }

      return response.json();
    });

    return promise;
  }, options);
}
