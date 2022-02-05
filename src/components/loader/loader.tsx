import styled from "styled-components/macro";

import circularLoaderImg from "assets/images/circular-loader.png";

interface Props {
  className?: string;
  /* if true, loading animation will appear */
  loading: boolean;
  children?: React.ReactNode;
}

const Loader = ({ className, loading, children = null }: Props) => {
  return loading ? (
    <Container className={className}>
      <ProgressIndicator />
    </Container>
  ) : (
    <>{children}</>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressIndicator = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 48px;
  min-height: 48px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-size: contain;
    width: 100%;
    height: 100%;
    background-image: url(${circularLoaderImg});
    background-repeat: no-repeat;
    animation: rotate 0.8s linear infinite;
  }
`;

export default Loader;
