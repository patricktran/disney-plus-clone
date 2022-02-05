import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState, forwardRef } from "react";

import { default as Slider, Settings } from "react-slick";
import styled, { css } from "styled-components/macro";

import Icon from "components/icon";

// #region Arrows
type ArrowIconName = "chevron-left" | "chevron-right";

function GenerateArrow(iconName: ArrowIconName, props: any) {
  const { className, style, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{ ...style }}
    >
      <Icon name={iconName} />
    </button>
  );
}

function PrevArrow(props: any) {
  return GenerateArrow("chevron-left", props);
}

function NextArrow(props: any) {
  return GenerateArrow("chevron-right", props);
}

// #endregion Arrows

type Justify = "center" | "left";

interface Props {
  className?: string;
  justify?: Justify;
  children: React.ReactNode;
}

// see: https://react-slick.neostack.com/docs/api
interface CarouselProps extends Settings, Props {}

const Carousel = forwardRef<any, CarouselProps>(
  ({ className, children, justify = "center", ...rest }, ref) => {
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultSettings: Settings = {
      autoplay: false,
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      // lazyLoad: "progressive" | "ondemand", // enabling this causes a weird effect when Slider children uses LazyImage. Best not to have this as a default.
    };

    const settings = {
      ...defaultSettings,
      ...rest,
      onInit: () => {
        setIsInitialized(true);

        // run the onInit prop if defined
        if (rest.onInit) {
          rest.onInit();
        }
      },
    };

    return (
      <Container className={className} hide={!isInitialized}>
        <StyledSlider $justify={justify} ref={ref} {...settings}>
          {children}
        </StyledSlider>
      </Container>
    );
  }
);

const Container = styled.div<{ hide?: boolean }>`
  position: relative;
  //fade in to reduce flickering
  opacity: 1;
  transition: opacity 250ms ease-in-out;

  ${(props) =>
    props.hide &&
    css`
      opacity: 0;
    `}
`;

const StyledSlider = styled(Slider)<{ $justify: Justify }>`
  .slick-list {
    overflow: initial; //see part of the next item
    margin: 0 -10px;
  }

  .slick-track {
    position: relative;
    top: 0px;
    left: 0px;
    display: block;

    ${(props) =>
      props.$justify === "left" &&
      css`
        margin-left: initial;
        margin-right: initial;
      `}

    div.slick-slide {
      padding: 0 10px;
      min-height: 1px;
      height: 100%;
      opacity: 0.5;
      transition: opacity 150ms cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s !important;

      ${(props) => css`
        @media ${props.theme.deviceMinWidth.medium} {
          padding: 0 10px;
        }
      `}

      &.slick-active {
        opacity: 1;
      }
    }
  }

  & > button {
    opacity: 0;
    height: 100%;
    width: calc(3.5vw + 24px);
    top: 0;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: 0.2s ease 0s;
    }

    &:before {
      content: "";
    }

    &.slick-prev {
      left: 0;
      //move to the leftmost position without affect other surrounding elements
      transform: translateX(-100%);

      &.slick-disabled {
        display: none !important;
      }
    }

    &.slick-next {
      right: 0;
      //move to the rightmost position without affect other surrounding elements
      transform: translateX(100%);

      &.slick-disabled {
        display: none !important;
      }
    }

    img {
      width: 40px;
    }
  }

  ul.slick-dots {
    position: absolute;
    bottom: 10px;
    right: 20px;
    text-align: right;

    li {
      margin: 0 3px;
    }

    li button {
      &::before {
        opacity: 1;
        font-size: 10px;
        color: rgb(150, 158, 171);
      }
    }

    li.slick-active button::before {
      color: ${(props) => props.theme.colors.white.default};
    }
  }
`;

export default Carousel;
