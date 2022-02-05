import ReactDOM from "react-dom";
import styled from "styled-components/macro";

import AppContext from "utils/app-context";

import Loader from "./loader";

type Props = {
  loading: boolean;
  children?: React.ReactNode;
};

const OverlayLoader = ({ loading, children = null }: Props) => {
  return loading ? (
    ReactDOM.createPortal(
      <Container>
        <LoaderWrapper loading={true} />
      </Container>,
      AppContext.Web.OverlayRootEl!
    )
  ) : (
    <>{children}</>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 5000;
  left: 0;
  top: 0;
`;

const LoaderWrapper = styled(Loader)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
`;

export default OverlayLoader;
