import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import CtaLogo from "assets/images/cta-logo-one.svg";
import CtaLogoTwo from "assets/images/cta-logo-two.png";
import LoginBackground from "assets/images/login-background.jpg";
import Typography from "components/typography";
import { ROUTE_PATHS } from "routes/paths";

const Login = () => {
  return (
    <Container>
      <Content>
        <CTA>
          <LogoImage src={CtaLogo} alt="" />
          <SignUp to={ROUTE_PATHS.HOME}>Get the Disney Bundle</SignUp>
          <Description variant="ps">Stream now. Terms apply.</Description>
          <LogoImageSmall src={CtaLogoTwo} alt="" />
        </CTA>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background-image: url(${LoginBackground});
  background-size: cover;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 40px;
`;

const CTA = styled.div`
  width: 100%;
  max-width: 650px;
  margin-bottom: 2vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SignUp = styled(Link)`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white.default};
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.blue.default};
  margin-bottom: 14px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 17px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #0483ee;
  }
`;

const LogoImage = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

// add override for higher specificity: https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
const LogoImageSmall = styled(LogoImage)`
  &&& {
    max-width: 550px;
  }
`;

const Description = styled(Typography)`
  color: #ccc;
  font-size: 11px;
  margin-bottom: 20px;
`;

export default Login;
