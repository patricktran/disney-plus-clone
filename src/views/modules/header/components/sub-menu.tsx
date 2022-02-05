import React, { useState } from "react";

import styled, { css } from "styled-components/macro";

import Loader from "components/loader";
import { userSelectors, userActions, userConstants } from "state/ducks/user";
import { useAppSelector, useAppDispatch } from "state/hooks";
import { useUpdateUserProfile } from "state/services";

const OPTIONS = ["Edit profiles", "App settings", "Account", "Help", "Log out"];

export const SubMenuHoverContext = React.createContext(false);

interface Props {
  children: React.ReactNode;
}

const SubMenu = ({ children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const user = useAppSelector(userSelectors.getUser);
  const otherProfiles = userConstants.USER_PROFILES.filter(
    (u) => u.id !== user.id
  );

  const { mutateUserProfile, isLoading } = useUpdateUserProfile();
  const dispatch = useAppDispatch();

  const handleProfileChange = (userId: number) => (): void => {
    const profile = userConstants.USER_PROFILES.find((u) => u.id === userId)!;

    // call api endpoint
    mutateUserProfile(
      {
        userId,
        user: profile,
      },
      {
        onSuccess: (response) => {
          // update redux store
          dispatch(userActions.change(profile));
        },
      }
    );
  };

  // curry function
  const handleHovered = (isHovered: boolean) => () => {
    setIsHovered(isHovered);
  };

  return (
    <Loader loading={isLoading}>
      <Container
        onMouseOver={handleHovered(true)}
        onMouseOut={handleHovered(false)}
      >
        <SubMenuHeader>
          <SubMenuHoverContext.Provider value={isHovered}>
            {children}
          </SubMenuHoverContext.Provider>
        </SubMenuHeader>
        <SubMenuListContainer>
          <SubMenuList>
            <ListItemBorder />
            {otherProfiles.map((profile) => (
              <ProfileListItem
                onClick={handleProfileChange(profile.id)}
                key={profile.id}
              >
                <img
                  alt={`${profile.name} profile`}
                  src={profile.profileImage}
                />
                <span>{profile.name}</span>
              </ProfileListItem>
            ))}
            {OPTIONS.map((option, idx) => (
              <ListItem key={idx}>{option}</ListItem>
            ))}
          </SubMenuList>
        </SubMenuListContainer>
      </Container>
    </Loader>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1000;
  top: 0;
  right: 0;
  position: absolute;
  border-radius: 4px;
  width: 240px;
  height: ${(props) => props.theme.mainHeader.height};
  max-height: ${(props) => props.theme.mainHeader.height};
  background-color: transparent;
  transition-duration: 300ms;
  transition-property: max-height, height, padding;
  transition-timing-function: ease-in-out;
  border: 1px solid transparent;

  &:hover {
    height: auto;
    background-color: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    max-height: calc(100vh - 40px);
  }
`;

const SubMenuHeader = styled.div`
  padding: 0 20px 0 0;
`;

const SubMenuListContainer = styled.div`
  opacity: 0;
  visibility: hidden;

  ${Container}:hover & {
    transition: opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 250ms;
    opacity: 1;
    visibility: visible;
  }
`;

const SubMenuList = styled.ul`
  margin: 0;
  padding: 0 0 10px 0;
  height: 100%;
  cursor: pointer;
`;

const ListItemBorder = styled.li`
  background-color: rgba(249, 249, 249, 0.1);
  display: flex;
  height: 1px;
  margin: 0px auto 0 auto;
  width: 85%;
`;

const ListItem = styled.li`
  font-weight: 300;
  margin: 20px 0 20px 20px;
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white.secondary};

  &:hover {
    color: #fff;
  }
`;

const ProfileListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;

  img {
    height: 36px;
    width: 36px;

    ${(props) => css`
      @media ${props.theme.deviceMinWidth.medium} {
        height: 48px;
        width: 48px;
      }
    `}
  }
`;

export default SubMenu;
