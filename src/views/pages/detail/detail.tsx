import { useState, useEffect } from "react";

import useScrollPosition from "@react-hook/window-scroll";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import Button from "components/button";
import Icon, { IconButton } from "components/icon";
import LazyImage from "components/image";
import { OverlayLoader } from "components/loader";
import Typography from "components/typography";
import Vingette from "components/vingette";
import { ROUTE_PATHS } from "routes/paths";
import { catalogSelectors, catalogConstants } from "state/ducks/catalog";
import { useAppSelector } from "state/hooks";
import AppContext from "utils/app-context";
import { noop } from "utils/helpers/functional";
import PageContainer from "views/layouts/page-container";

import SeriesNav from "./modules/series/";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const scrollY = useScrollPosition();

  // fake delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // move scroll to top
      AppContext.Web.WindowRef.scrollTo(0, 0);
    }, 500);
  }, []);

  const { id } = useParams<any>();

  const showEpisodesTab = id === catalogConstants.SIMPSONS_SERIES_ID;

  const itemDetails = useAppSelector((state) =>
    catalogSelectors.getCatalogItemById(state, +id!)
  );

  const playVideo = () => {
    navigate(`${ROUTE_PATHS.VIDEO}/${id}`);
  };

  return (
    <StyledPageContainer>
      <OverlayLoader loading={loading}>
        <article>
          <BackgroundContainer
            style={{ opacity: Math.max(1 - (scrollY / 100) * 0.3, 0.2) }}
          >
            {itemDetails?.backgroundImg && (
              <LazyImage
                src={itemDetails?.backgroundImg}
                onLoadedClassName="loaded"
              />
            )}
            <Vingette />
          </BackgroundContainer>
          <TitleImage>
            {itemDetails?.titleImg && <LazyImage src={itemDetails?.titleImg} />}
          </TitleImage>
          <MetaContainer>
            <SubtitleContainer>
              <Typography variant="ps">{itemDetails?.subTitle}</Typography>
            </SubtitleContainer>
            <ControlsContainer>
              <StyledButton onClick={playVideo}>
                <Icon name="play-dark" />
                <span>Play</span>
              </StyledButton>
              <StyledButton variant="secondary">
                <Icon name="play-light" />
                <span>Trailer</span>
              </StyledButton>
              <IconButton name="plus" onClick={noop} />
              <IconButton name="group" onClick={noop} />
            </ControlsContainer>
            <DescriptionContainer>
              <Typography variant="pl">{itemDetails?.description}</Typography>
            </DescriptionContainer>
          </MetaContainer>
          {showEpisodesTab && (
            <>
              <TabNav>
                <Tab>Episodes</Tab>
              </TabNav>
              <TabContent>
                <SeriesNav />
              </TabContent>
            </>
          )}
        </article>
      </OverlayLoader>
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled(PageContainer)`
  &::after {
    background-image: none;
    background-color: rgb(26, 29, 41);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  animation: fadein 450ms ease-in;

  img {
    width: 100vw;
    // transform: scale(1.2);
    // transition: all 450ms ease-out;

    &.loaded {
      // animation not needed since LazyImage will auto fade in image
      // transform: scale(1);
      //animation: fadein 450ms ease-in;
    }
  }
`;

const TitleImage = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 60px;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 341px;
    min-width: 100px;
    width: 35vw;
  }
`;

const MetaContainer = styled.div`
  max-width: 874px;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0;
  min-height: 56px;
`;

const StyledButton = styled(Button)`
  img {
    width: 30px;
    margin-right: 3px;
  }
`;

const SubtitleContainer = styled.div`
  padding: 12px 0 0 0;
`;

const DescriptionContainer = styled.div`
  padding: 1rem 0;
`;

const TabNav = styled.nav`
  border-bottom: 2px solid rgba(249, 249, 249, 0.2);
  display: flex;
  margin: 16px 0px 16px;
`;

const Tab = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 40px;
  padding-bottom: 15px;
  position: relative;
  transition: all 350ms ease 0s;
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 1.4;
  text-transform: uppercase;

  &:after {
    background-color: ${(props) => props.theme.colors.white.default};
    border-radius: 50px 50px 0px 0px;
    content: "";
    height: 3px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    opacity: 1;
    transition: opacity 200ms ease 0s;
  }
`;

const TabContent = styled.div`
  margin: 0 0 100px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Detail;
