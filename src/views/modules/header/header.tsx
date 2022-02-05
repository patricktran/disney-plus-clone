import useScrollPosition from "@react-hook/window-scroll";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";

import Logo from "assets/images/logo.svg";
import { ROUTE_PATHS } from "routes/paths";

import CurrentUser from "./components/current-user";
import MenuLink from "./components/menu-link";
import SubMenu from "./components/sub-menu";
export interface HeaderConfigProps {
  threshold?: number;
  defaultBackgroundColor?: string;
  scrolledBackgroundColor?: string;
}

const Header = ({
  threshold = 1,
  defaultBackgroundColor = "transparent",
  scrolledBackgroundColor = "rgb(9, 11, 19)",
}) => {
  const scrollY = useScrollPosition();

  const style = {
    backgroundColor: defaultBackgroundColor,
  };

  if (scrollY > threshold) {
    style.backgroundColor = scrolledBackgroundColor;
  }

  return (
    <Container style={style}>
      <LogoContainer>
        <Link to={ROUTE_PATHS.HOME}>
          <img src={Logo} alt="" />
        </Link>
      </LogoContainer>
      <Nav>
        <Menu>
          <MenuLink to={ROUTE_PATHS.HOME} iconName="home">
            Home
          </MenuLink>
          <MenuLink to={ROUTE_PATHS.HOME} iconName="originals">
            Originals
          </MenuLink>
          <MenuLink to={ROUTE_PATHS.HOME} iconName="movies">
            Movies
          </MenuLink>
          <MenuLink to={ROUTE_PATHS.HOME} iconName="series">
            Series
          </MenuLink>
        </Menu>
      </Nav>
      <Profile>
        <SubMenu>
          <CurrentUser />
        </SubMenu>
      </Profile>
    </Container>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  padding: 0 38px;
  position: fixed;
  z-index: 20;
  top: 0px;
  left: 0px;
  right: 0px;
  height: ${(props) => props.theme.mainHeader.height};
  transition: all 0.2s ease-in-out 0s;
  will-change: background-color, height;

  &::after {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.03) 15%,
      rgba(0, 0, 0, 0.125) 30%,
      rgba(0, 0, 0, 0.25) 46%,
      rgba(0, 0, 0, 0.4) 61%,
      rgba(0, 0, 0, 0.553) 75%,
      rgba(0, 0, 0, 0.694) 88%,
      rgba(0, 0, 0, 0.8)
    );
    content: "";
    height: 172px;
    left: 0px;
    position: absolute;
    right: 0px;
    top: 0px;
    transition: height 300ms ease 0s;
    z-index: -1;
    will-change: height;
    pointer-events: none;
  }
`;

const LogoContainer = styled.div`
  > a {
    display: block;
    width: 74px;

    img {
      width: 100%;
      display: block;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  display: none;

  ${(props) => css`
    @media ${props.theme.deviceMinWidth.medium} {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: 10px;
    }
  `}
`;

const Profile = styled.div`
  justify-self: flex-end;
`;

export default Header;
