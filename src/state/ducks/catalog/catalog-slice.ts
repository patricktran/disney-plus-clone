// eslint-disable-next-line
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Catalog } from "./types";

const catalogInitialState = {
  items: [] as Catalog[],
  loading: false,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState: catalogInitialState,
  reducers: {
    get: (state, { payload }: PayloadAction) => {
      state.loading = true;
    },
    fullfilled: (state, { payload }: PayloadAction<Catalog[]>) => {
      // immer allows this mutation for non primitives
      // otherwise, we would have to use Array.map and spread to new object
      state.items = payload;
      state.loading = false;
    },
    error: (state, { payload }: PayloadAction) => {
      state.loading = false;
    },
  },
});

export const catalogActions = catalogSlice.actions;

export default catalogSlice.reducer;
