import { useState } from "react";

import styled, { css } from "styled-components/macro";

import Button from "components/button";
import Icon from "components/icon";
import { defaultVideoControlsOpacity } from "styles/placeholders/base";
import { noop } from "utils/helpers/functional";

interface Props {
  /** callback for when audio options are shown/hidden */
  onShowAudioOptionsChange?: (shown: boolean) => void;
  children: React.ReactNode;
}

const DefaultAudioOptionsBug = ({
  onShowAudioOptionsChange = noop,
  children,
}: Props) => {
  const [showAudioContent, setShowAudioContent] = useState(false);

  const handleOpenAudioContent = () => {
    setShowAudioContent(true);
    onShowAudioOptionsChange(true);
  };

  const handleCloseAudioContent = () => {
    setShowAudioContent(false);
    onShowAudioOptionsChange(false);
  };

  return (
    <AudioContainer>
      <Button variant="link" onClick={handleOpenAudioContent}>
        <SubtitleIcon name="subtitles" />
      </Button>
      <AudioContent $showAudioContent={showAudioContent}>
        <Button variant="link" onClick={handleCloseAudioContent}>
          <CloseIcon name="close" />
        </Button>
        <OptionsContainer>{children}</OptionsContainer>
      </AudioContent>
    </AudioContainer>
  );
};

const AudioContainer = styled.div``;

const SubtitleIcon = styled(Icon)`
  position: relative;
  z-index: 100;

  img {
    width: 35px;
    filter: invert(0.8);

    &:hover {
      filter: invert(1);
    }
  }
`;

const CloseIcon = styled(Icon)`
  transform: scale(2);
  ${defaultVideoControlsOpacity}
`;

const AudioContent = styled.div<{ $showAudioContent: boolean }>`
  position: absolute;
  z-index: 500;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  margin-right: -100%;
  transition: margin-right 0.2s ease-in, background-color 0s ease;
  padding: 20px;

  ${(props) =>
    props.$showAudioContent &&
    css`
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.8);
      margin-right: 0;
    `}
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  height: 85%;
`;

export default DefaultAudioOptionsBug;
