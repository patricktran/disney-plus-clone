import { createCachedSelector } from "re-reselect";

import { State } from "../../store";

import { CollectionType } from "./types";

export const isLoading = (state: State) => state.catalog.loading;
export const getAll = (state: State) => state.catalog.items;

/* for reference: non re-reselect version
export const getByCollectionType = (state: State, type: CollectionType) => {
  if (type === "all") {
    return getAll(state);
  }

  return getAll(state).filter((x) => x.type === type);
};
*/

// https://github.com/toomuchdesign/re-reselect
export const getByCollectionType = createCachedSelector(
  // inputSelectors
  getAll,
  (state: State, type: CollectionType) => type,
  // resultFunc
  (allItems, type) => {
    if (type === "all") {
      return allItems.filter((x) => x.type !== "origin");
    }

    return allItems.filter((x) => x.type === type);
  }
)(
  // re-reselect keySelector (receives selectors' arguments)
  // Use "type" as cacheKey
  (_state_, type) => type.toString()
);

export const getCatalogItemById = (state: State, id: number) => {
  return getAll(state).find((x) => x.id === id);
};
