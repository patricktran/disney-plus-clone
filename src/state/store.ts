import { configureStore, AnyAction, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { Epic } from "redux-observable";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { AjaxCreationMethod } from "rxjs/internal/ajax/ajax";

import * as reducers from "./ducks";
import { rootEpic } from "./epics";
// RTK Query
import { disneyApi } from "./services/rtk-query/disneymock/api";

interface EpicDependency {
  ajax: AjaxCreationMethod;
}

// https://github.com/redux-observable/redux-observable/issues/706
// Infer the `RootState` - must combineReducers first
const rootReducer = combineReducers({
  ...reducers,
  [disneyApi.reducerPath]: disneyApi.reducer,
});

export type State = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  State,
  EpicDependency
>({
  dependencies: {
    // add dependencies so that epics are unit testable
    ajax,
  },
});

// redux-logger
const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== "production",
});

const store = configureStore({
  reducer: rootReducer,
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger) // default middleware + logger
      .concat(disneyApi.middleware)
      .concat(epicMiddleware),

  devTools: process.env.NODE_ENV !== "production",
});

epicMiddleware.run(rootEpic);

// Inferred type
export type AppDispatch = typeof store.dispatch;

export type AppEpic = Epic<AnyAction, AnyAction, State, EpicDependency>;

export default store;
