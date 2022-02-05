import styled, { css } from "styled-components/macro";

import LazyImage from "components/image";

// controls z-index for displaying hover over asset
type HoverAssetPositionType = "behind" | "above";

export type CardLayout = "landscape" | "portrait";

export interface CardProps {
  imageSrc: string;
  onHoverVideoSrc?: string;
  onHoverImageSrc?: string;
  children?: React.ReactNode;
  hoverAssetPosition?: HoverAssetPositionType;
  layout?: CardLayout;
  className?: string;
  borderRadius?: number;
}

const Card = ({
  className,
  imageSrc,
  onHoverImageSrc,
  onHoverVideoSrc,
  hoverAssetPosition = "above",
  layout = "landscape",
  children,
  borderRadius = 4,
}: CardProps) => {
  if (onHoverImageSrc && onHoverVideoSrc) {
    console.warn(
      "Values for onHoverImageSrc and onHoverVideoSrc both provided.  Please provide a value for only one or the other."
    );
  }

  return (
    <Container className={className} $borderRadius={borderRadius}>
      <ImageContainer $layout={layout} $borderRadius={borderRadius}>
        <LazyImage src={imageSrc} />
        {onHoverImageSrc && (
          <HoverLazyImage
            hoverAssetPosition={hoverAssetPosition}
            src={onHoverImageSrc}
          />
        )}
        {onHoverVideoSrc && (
          <Video
            hoverAssetPosition={hoverAssetPosition}
            autoPlay={true}
            loop={true}
            playsInline={true}
            muted
          >
            <source src={onHoverVideoSrc} type="video/mp4" />
          </Video>
        )}
      </ImageContainer>
      <>{children}</>
    </Container>
  );
};

interface BorderRadius {
  $borderRadius: number;
}

const Container = styled.div<BorderRadius>`
  position: relative;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: ${(props) => props.theme.boxShadow.default};

  &::after {
    border-radius: ${(props) => props.$borderRadius}px;
    border: 3px solid rgba(255, 255, 255, 0);
    inset: 0px;
    content: "";
    position: absolute;
    transition: border 300ms ease-out 0s;
    z-index: 10;
  }

  &:hover {
    transform: scale(1.05) translateZ(0px) translate3d(0px, 0px, 0px);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    &::after {
      border: 3px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

const ImageContainer = styled.div<{ $layout: CardLayout } & BorderRadius>`
  border-radius: ${(props) => props.$borderRadius}px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  //border: 3px solid rgba(255, 255, 255, 0);
  background: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));

  ${(props) =>
    props.$layout === "landscape" &&
    css`
      padding-top: 56.25%; //css trick - use percentage of the containing element's width for responsive 16:9 aspect ratio
    `};

  ${(props) =>
    props.$layout === "portrait" &&
    css`
      padding-top: 140.84%; //css trick - use percentage of the containing element's width for aspect ratio
    `};

  img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }

  /*${Container}:hover &::after {
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  }

  &::after {
    border-radius: 4px;
    border: 4px solid rgba(255, 255, 255, 0);
    inset: 0px;
    content: "";
    position: absolute;
    transition: border 300ms ease-out 0s;
    z-index: 10;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    &::after {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }*/
`;

const HoverLazyImage = styled(LazyImage)<Pick<CardProps, "hoverAssetPosition">>`
  transition: opacity 500ms ease-in-out 0s;
  opacity: 0 !important; //force opacity to remain at 0 until hover state

  ${Container}:hover & {
    opacity: 1 !important;
  }

  //modifiers
  ${(props) =>
    props.hoverAssetPosition === "behind" &&
    css`
      z-index: 0;
    `}

  ${(props) =>
    props.hoverAssetPosition === "above" &&
    css`
      z-index: 3;
    `}
`;

const Video = styled.video<Pick<CardProps, "hoverAssetPosition">>`
  width: 103%;
  height: 103%;
  position: absolute;
  inset: -2px 0 0 0;
  opacity: 0;
  z-index: 0;

  ${Container}:hover & {
    opacity: 1;
  }

  //modifiers
  ${(props) =>
    props.hoverAssetPosition === "above" &&
    css`
      z-index: 3;
    `}
`;

export default Card;
