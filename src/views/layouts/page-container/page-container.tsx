import styled from "styled-components/macro";

import HomeBackgroundImage from "assets/images/home-background.png";
import ErrorBoundary from "components/error-boundary";
import Footer from "views/modules/footer";
import Header, { HeaderConfigProps } from "views/modules/header";

interface Props {
  className?: string; // see: https://styled-components.com/docs/basics#styling-any-component
  children: React.ReactNode;
  headerConfig?: HeaderConfigProps;
}

const PageContainer = ({ className, headerConfig, children }: Props) => {
  return (
    <ErrorBoundary>
      <StyledContainer className={className}>
        <Header {...headerConfig} />
        <StyledMain>{children}</StyledMain>
        <Footer />
      </StyledContainer>
    </ErrorBoundary>
  );
};

const StyledContainer = styled.div`
  -webkit-font-smoothing: antialiased;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  user-select: none;

  &::after {
    background: url(${HomeBackgroundImage}) center center / cover no-repeat
      fixed;
    content: "";
    position: fixed;
    inset: 0;
    top: 72px;
    z-index: -2;
  }
`;

const StyledMain = styled.main`
  position: relative;
  top: 72px;
  gap: 0.2rem;
  padding: 0 calc(3.5vw + 24px);
  overflow-x: hidden;
  min-height: calc(100vh - 250px);
  margin-bottom: 100px;
`;

export default PageContainer;
