import { FC } from "react";
import { useEffect, useState } from "react";

import { catalogActions } from "state/ducks/catalog";
import { useAppDispatch } from "state/hooks";
import { useGetEnvConfig } from "state/services/react-query/hooks/local/config";
import AppContext from "utils/app-context";

const AppLayout: FC<{}> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [isAppContextReady, setIsAppContextReady] = useState(false);
  const { data: configData, isSuccess: isConfigSuccess } = useGetEnvConfig();

  useEffect(() => {
    if (isConfigSuccess && configData) {
      AppContext.Config = configData;
      setIsAppContextReady(true);
    }
  }, [isConfigSuccess, configData]);

  // fetch the catalog once per app session once AppConfig is hydrated
  useEffect(() => {
    if (isAppContextReady) {
      dispatch(catalogActions.get());
    }
  }, [dispatch, isAppContextReady]);

  return isAppContextReady ? <div>{children}</div> : null;
};

export default AppLayout;
