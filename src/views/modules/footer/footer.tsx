import styled from "styled-components/macro";

import Logo from "assets/images/logo.svg";
import Typography from "components/typography";

const Footer = () => {
  return (
    <Container>
      <img src={Logo} alt="Disney+" />
      <StyledUL>
        <li>Privacy Policy</li>
        <li>Help</li>
        <li>Closed Captioning</li>
        <li>Supported Devices</li>
        <li>About Us</li>
        <li>Disney+ Partner Program</li>
      </StyledUL>
      <Typography variant="pxs">Interest-based Ads</Typography>
      <Typography variant="pxs">All Rights Reserved</Typography>
    </Container>
  );
};

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 20px;
  background-color: #000;
  gap: 12px;
  color: #cacaca;

  img {
    width: 80px;
  }
`;

const StyledUL = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;

  li {
    font-size: 12px;
  }
`;

export default Footer;
