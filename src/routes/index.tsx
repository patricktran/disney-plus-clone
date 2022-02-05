import { lazy, Suspense } from "react";

import {
  BrowserRouter,
  Routes as RouteContainer,
  Route,
  Navigate,
} from "react-router-dom";

import { OverlayLoader } from "components/loader";
import Home from "views/pages/home";

import { ROUTE_PATHS } from "./paths";

const Login = lazy(() => import("views/pages/login"));
const Detail = lazy(() => import("views/pages/detail"));
const Video = lazy(() => import("views/pages/video"));

const Routes = () => {
  return (
    <>
      <Suspense fallback={<OverlayLoader loading={true} />}>
        <BrowserRouter>
          <RouteContainer>
            <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route path={`${ROUTE_PATHS.DETAIL}/:id`} element={<Detail />} />
            <Route path={`${ROUTE_PATHS.VIDEO}/:id`} element={<Video />} />
            {/* catch all - redirect to homepage */}
            <Route
              path="*"
              element={<Navigate replace to={ROUTE_PATHS.HOME} />}
            />
          </RouteContainer>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default Routes;
