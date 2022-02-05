import { useContext } from "react";

import styled, { css } from "styled-components/macro";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { userSelectors } from "state/ducks/user";
import { useAppSelector } from "state/hooks";

import { SubMenuHoverContext } from "./sub-menu";

const CurrentUser = () => {
  const user = useAppSelector(userSelectors.getUser);
  const isSubMenuHovered = useContext(SubMenuHoverContext);

  return (
    <Container>
      <ProfileName $visible={isSubMenuHovered}>{user.name}</ProfileName>
      <ProfileImage>
        <img src={user.profileImage} alt={`${user.name} profile`} />
      </ProfileImage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  height: ${(props) => props.theme.mainHeader.height};
`;

const ProfileName = styled.span<{ $visible: boolean }>`
  padding: 5px;
  cursor: pointer;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
`;

const ProfileImage = styled.div`
  position: relative;
  height: 36px;
  width: 36px;
  cursor: pointer;

  ${(props) => css`
    @media ${props.theme.deviceMinWidth.medium} {
      height: 48px;
      width: 48px;
    }
  `}

  img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }
`;

export default CurrentUser;
