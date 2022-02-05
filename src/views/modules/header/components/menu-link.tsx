import { FC } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import Icon, { IconName } from "components/icon/icon";

interface Props {
  to: string;
  iconName: IconName;
}

const MenuLink: FC<Props> = ({ to, iconName, children }) => {
  return (
    <StyledLink to={to}>
      <StyledIcon name={iconName} /> <Span>{children}</Span>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 18px;
  text-decoration: none;
`;

const StyledIcon = styled(Icon)`
  img {
    width: 20px;
    height: 20px;
  }
`;

const Span = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.colors.white.default};
  text-transform: uppercase;
  margin-left: 10px;
  position: relative;
  font-weight: bold;
  letter-spacing: 0.08em;

  //underline effect on hover
  &::before {
    width: auto;
    content: "";
    background-color: ${(props) => props.theme.colors.white.default};
    border-radius: 0 0 4px 4px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    transform-origin: left center; //where to begin the scale from
    transform: scaleX(0);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    opacity: 0;
  }

  //hovering over parent executes underline effect
  ${StyledLink}:hover & {
    &::before {
      transform: scaleX(1);
      opacity: 1;
    }
  }
`;

export default MenuLink;
