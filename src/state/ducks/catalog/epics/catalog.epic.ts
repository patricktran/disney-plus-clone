import { of } from "rxjs";
import {
  switchMap,
  map,
  mergeMap,
  catchError,
  filter,
  retryWhen,
} from "rxjs/operators";

import { AppEpic } from "state/store";
import AppContext from "utils/app-context";
import genericRetryStrategy from "utils/rxjs/generic-retry-strategy";

import { catalogActions } from "../";
import { Catalog } from "../types";

interface Response {
  items: Catalog[];
}

const getCatalogEpic: AppEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    filter(catalogActions.get.match), // this way provides TS typings for action.payload
    switchMap((action) => {
      return ajax.get(`${AppContext.Config.api.disneyBaseUrl}/catalog`).pipe(
        map((result: any) => result.response),
        mergeMap((data: Response) => of(catalogActions.fullfilled(data.items))),
        retryWhen(genericRetryStrategy()), // retry upon errors
        catchError(() => of(catalogActions.error()))
      );
    })
  );

export default getCatalogEpic;
