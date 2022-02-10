import { useEffect } from "react";

import { catalogActions } from "state/ducks/catalog";
import { useAppDispatch } from "state/hooks";
interface Props {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(catalogActions.get());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppLayout;
