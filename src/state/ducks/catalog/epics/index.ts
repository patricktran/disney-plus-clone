import { combineEpics } from "redux-observable";

import getCatalogEpic from "./catalog.epic";

export default combineEpics(getCatalogEpic);
