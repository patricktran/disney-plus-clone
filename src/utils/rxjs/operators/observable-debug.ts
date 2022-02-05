import { tap } from "rxjs/operators";

const enableDebug =
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";

/**
 * Custom debug operator for rxjs.
 * For local debugging purposes only. Disabled for production builds
 *
 * Example Usage:
 *  .pipe(
 *     ...,
 *     debug()
 *   )
 *
 * @param {string} message
 */
export default function debug(message = "") {
  return (source: any) => {
    return source.pipe(
      tap({
        next: (val) => {
          if (enableDebug) {
            console.log("Observable NEXT >>> ", message, val);
          }
        },
        error: (err) => {
          if (enableDebug) {
            console.error("Observable ERROR >>> ", message, err);
          }
        },
        complete: () => {
          if (enableDebug) {
            console.log("Observable COMPLETED >>> ", message);
          }
        },
      })
    );
  };
}
