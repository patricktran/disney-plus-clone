import { FC } from "react";
import { useEffect, useState } from "react";

import { catalogActions } from "state/ducks/catalog";
import { useAppDispatch } from "state/hooks";
import AppContext from "utils/app-context";

const AppLayout: FC<{}> = ({ children }) => {
  const dispatch = useAppDispatch();
  console.log(process.env);
  const [isAppContextReady, setIsAppContextReady] = useState(false);

  useEffect(() => {
    AppContext.HydrateConfig();
    setIsAppContextReady(true);
  }, []);

  // fetch the catalog once per app session once AppConfig is hydrated
  useEffect(() => {
    if (isAppContextReady) {
      dispatch(catalogActions.get());
    }
  }, [dispatch, isAppContextReady]);

  return isAppContextReady ? <div>{children}</div> : null;
};

export default AppLayout;
