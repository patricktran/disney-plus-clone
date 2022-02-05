import { FC } from "react";

import styled from "styled-components/macro";

/**
 * Idea:  Use ReactContext and expose methods to switch modes?
 * Video Mode (video player large and do not render PostPlay)
 * PostPlay Mode (video player small and render PostPlay)
 */

interface VideoPageContainerComposition {
  Main: FC<CompProps>;
  PostPlay: FC<CompProps>;
}

const VideoPageContainer: FC<{}> & VideoPageContainerComposition = ({
  children,
}) => {
  return <>{children}</>;
};

interface CompProps {
  className?: string;
}

const Main: FC<CompProps> = ({ className, children }) => {
  return <MainContainer className={className}>{children}</MainContainer>;
};

const PostPlay: FC<CompProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

VideoPageContainer.Main = Main;
VideoPageContainer.PostPlay = PostPlay;

const MainContainer = styled.div`
  background-color: black;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
`;

export default VideoPageContainer;
