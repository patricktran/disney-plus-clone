import { useEffect, useRef, useState } from "react";

import {
  // @ts-ignore
  Player as ShakaPlayer,
  // @ts-ignore
  polyfill as ShakaPolyfill,
  // @ts-ignore
  ui as ShakaUI,
  // @ts-ignore
} from "shaka-player/dist/shaka-player.ui";
import styled, { css } from "styled-components/macro";

import Loader, { OverlayLoader } from "components/loader";
import CreatePortal from "components/portal";
import { defaultVideoControlsOpacity } from "styles/placeholders/base";

import AudioOptions from "./components/audio-options";
import DefaultAudioOptionsBug from "./components/default-audio-options-bug";
import DefaultTitleBug from "./components/default-title-bug";
import { audioOptions, subtitleOptions } from "./config/mock-data";
import uiConfig from "./config/ui";
import useShowOverlayIdle from "./hooks/use-show-overlay-idle";
import "shaka-player/dist/controls.css";
import "shaka-player-ui-controls/dist/main.css";

interface Props {
  url: string;
  title: string;
  // titleBugComponent: React.ReactNode; //future use case if not using DefaultTitleBug
  onTitleBugClick: () => void;
}

const VideoPlayerShak = ({ url, title, onTitleBugClick }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // placing inside useState instead of useRef because we want to trigger re-renders
  const [spinnerContainerRef, setSpinnerContainerRef] =
    useState<HTMLDivElement>();
  const [videoPaused, setVideoPaused] = useState(false);
  const [initOverlay, setInitOverlay] = useState(false);
  const [audioOptionsShown, setAudioOptionsShown] = useState(false);
  const [player, setPlayer] = useState<ShakaPlayer>(null);

  useEffect(() => {
    ShakaPolyfill.installAll();
    // Initialize shaka player
    const player = new ShakaPlayer(videoRef.current);
    setPlayer(player);

    const play = async () => {
      await player.load(url);

      // Setting up shaka player UI
      const ui = new ShakaUI.Overlay(
        player,
        containerRef.current,
        videoRef.current
      );

      ui.configure(uiConfig); // configure UI
      videoRef.current!.volume = 0.5;
      videoRef.current!.play();
    };

    if (player) {
      play();
    }

    return () => {
      player.destroy();
    };
  }, [url]);

  // WIP - get example thumbnail
  // https://github.com/google/shaka-player/issues/3371
  useEffect(() => {
    if (isVisible && player) {
      setTimeout(() => {
        console.log("image tracks", player.getImageTracks());

        const seekRange = player.seekRange();
        // const realPosition = seekRange.end - position;
        console.log("seekRange", seekRange);

        // (trackId, time)
        player.getThumbnails(12, 90).then((data: any) => console.log(data));
      }, 2000);
    }
  }, [player, isVisible]);

  useEffect(() => {
    function setIsPaused() {
      setVideoPaused(true);
    }

    function unSetIsPaused() {
      setVideoPaused(false);
    }

    function onLoadedData() {
      // add fake delay
      setTimeout(() => {
        setIsVisible(true);
        setInitOverlay(true);
      }, 500);
    }

    var ref = videoRef.current!;

    ref.addEventListener("pause", setIsPaused);
    ref.addEventListener("play", unSetIsPaused);
    ref.addEventListener("loadeddata", onLoadedData);

    return () => {
      ref.removeEventListener("pause", setIsPaused);
      ref.removeEventListener("play", unSetIsPaused);
      ref.removeEventListener("loadeddata", onLoadedData);
    };
  }, []);

  // custom spinner ui
  useEffect(() => {
    if (isVisible) {
      const match = containerRef.current!.getElementsByClassName(
        "shaka-spinner-container"
      );

      if (match.length > 0) {
        setSpinnerContainerRef(match[0] as HTMLDivElement);
      }
    }
  }, [isVisible]);

  const showOverlay = useShowOverlayIdle({
    elementRef: containerRef,
  });

  const onAudioOptionsShownChange = (shown: boolean) => {
    setAudioOptionsShown(shown);
  };

  const onAudioOptionValueChange = (value: string) => {
    console.log(`${value} selected - for demo purposes only.`);
  };

  return (
    <>
      <OverlayLoader loading={!isVisible} />
      <Container
        ref={containerRef}
        $isVisible={isVisible} // styled components - transient props
        $alwaysDisplayControls={audioOptionsShown}
      >
        <Video ref={videoRef} autoPlay />
        {isVisible && spinnerContainerRef && (
          <CreatePortal portalContainerRef={spinnerContainerRef}>
            <Loader loading={true} />
          </CreatePortal>
        )}
        {initOverlay && (
          <CreatePortal portalContainerRef={containerRef.current!}>
            <Overlay
              showOverlay={showOverlay || videoPaused || audioOptionsShown}
            >
              <OverlayHeader>
                <DefaultTitleBug onClick={onTitleBugClick} title={title} />
                <FlexSpacer />
                <DefaultAudioOptionsBug
                  onShowAudioOptionsChange={onAudioOptionsShownChange}
                >
                  <AudioOptions
                    title="Audio"
                    options={audioOptions}
                    defaultSelectedOption="English"
                    onOptionClick={onAudioOptionValueChange}
                  />
                  <AudioOptions
                    title="Subtitles"
                    options={subtitleOptions}
                    defaultSelectedOption="Off"
                    onOptionClick={onAudioOptionValueChange}
                  />
                </DefaultAudioOptionsBug>
              </OverlayHeader>
            </Overlay>
          </CreatePortal>
        )}
      </Container>
    </>
  );
};

const Container = styled.div<{
  $isVisible: boolean;
  $alwaysDisplayControls: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  transition: opacity 200ms ease-in-out;
  opacity: 0;

  ${(props) =>
    props.$isVisible &&
    css`
      opacity: 1;
    `}

  //override ordering from ui.css
  &&& {
    .shaka-controls-container {
      .shaka-bottom-controls {
        position: relative;
        top: -10px;
      }

      .shaka-controls-button-panel {
        position: relative;
        justify-content: flex-start;

        button {
          line-height: initial;
        }

        .shaka-current-time {
          opacity: 0.8;
        }

        .shaka-rewind-button,
        .shaka-small-play-button,
        .shaka-fast-forward-button,
        .shaka-mute-button,
        .shaka-fullscreen-button,
        button {
          ${defaultVideoControlsOpacity}
        }

        > .material-icons-round {
          font-size: 36px;
        }

        ${(props) =>
          props.$alwaysDisplayControls &&
          css`
            opacity: 1;
          `}
      }

      .shaka-current-time {
        z-index: -1; //fix hover over bug
      }

      .shaka-seek-bar-container {
        height: 3px;
        width: 98.5%;
        margin: 10px;
        top: 42px;
        position: absolute;
        transition: all 70ms ease-in;

        ${(props) =>
          props.$alwaysDisplayControls &&
          css`
            opacity: 1;
          `}

        //expand the hoverable area
        &::before {
          content: "";
          position: absolute;
          height: 30px;
          width: 100%;
          top: -10px;
          cursor: pointer;
        }

        input[type="range"] {
          cursor: pointer;
          height: 9px;
          transition: all 100ms ease-in;

          &::-webkit-slider-thumb {
            margin-top: 1px;
          }
        }

        &:hover {
          height: 8px;

          input[type="range"] {
            height: 12px;

            &::-webkit-slider-thumb {
              margin-top: 0;
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }

  //using customer buffer/spinner - hide shaka default
  .shaka-spinner-container {
    .shaka-spinner {
      display: none !important;
    }
  }
`;

const Video = styled.video`
  max-width: 100%;
  width: 100%;
  max-height: 100vh;
`;

const Overlay = styled.div<{ showOverlay: boolean }>`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 250ms ease-in-out;

  ${(props) =>
    props.showOverlay &&
    css`
      opacity: 1;
    `}
`;

const OverlayHeader = styled.div`
  display: flex;
  margin: 20px;
`;

const FlexSpacer = styled.div`
  flex-grow: 1;
`;

export default VideoPlayerShak;
