import { combineEpics } from "redux-observable";

import catalogEpics from "./ducks/catalog/epics";

export const rootEpic = combineEpics(catalogEpics); // add epics here
