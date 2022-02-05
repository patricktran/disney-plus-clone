import { throwError, timer, Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

interface GenericRetryStrategyOptions {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
}

/**
 * Retry with scaling duration backoff
 */
const genericRetryStrategy =
  ({
    maxRetryAttempts = 3, // by default, retries 3 more times after 1st try
    scalingDuration = 500,
    excludedStatusCodes = [401], // do not retry when encountering 401 status code
  }: GenericRetryStrategyOptions = {}) =>
  (errorAttempt$: Observable<any>) => {
    return errorAttempt$.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (
          retryAttempt > maxRetryAttempts ||
          excludedStatusCodes.find((e) => e === error.status)
        ) {
          return throwError(() => error);
        }
        // console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
        // retry after 500ms, 1000ms, etc...
        return timer(retryAttempt * scalingDuration);
      })
    );
  };

export default genericRetryStrategy;
