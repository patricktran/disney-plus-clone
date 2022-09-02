import { QueryClient } from "react-query";

// custom query client with aggressive, but sane defaults
// See: https://github.com/TanStack/query/blob/v3.38.1/src/core/types.ts
export default new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 1000, // 1 minute... default is 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false, // alternative set this to `true` if you don't want queries to be cached
      retryDelay: (attemptIndex) => Math.min(500 * attemptIndex, 30000),
      retry: (failureCount, error: any) => {
        switch (error.status) {
          case 401: {
            return false;
          }
          case 404: {
            return false;
          }
          default: {
            // Failure count starts at 0 so < 2 means 3 times
            return failureCount < 2;
          }
        }
      },
    },
  },
});
