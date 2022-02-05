import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";

import AppContext from "utils/app-context";

import { ContinueWatchingItem, EpisodeItem } from "./types";

// https://stackoverflow.com/questions/69568818/how-to-dynamicly-chane-base-url-using-redux-toolkit
const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const baseUrl = AppContext.Config.api.disneyBaseUrl; // grab base url from appcontext
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, baseQueryApi, extraOptions);
};

// https://redux-toolkit.js.org/rtk-query/overview
// createApi autogenerates a react hook
// queries cached for 60 seconds: https://redux-toolkit.js.org/rtk-query/usage/cache-behavior

/** "one API slice per base URL" as a rule of thumb. */
export const disneyApi = createApi({
  reducerPath: "disneyapi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    getContinueWatching: build.query<ContinueWatchingItem[], void>({
      query: () => `/continuewatching`,
    }),
    getEpisodes: build.query<EpisodeItem[], number>({
      query: (seriesId: number) => `/${seriesId}/episodes`,
    }),
  }),
});

// destructure and export hook
export const { useGetContinueWatchingQuery, useGetEpisodesQuery } = disneyApi;
