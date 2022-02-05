import styled, { css } from "styled-components/macro";

import Button from "components/button";
import Carousel from "components/carousel";
import { screenSizes } from "styles/theme";

interface Props {
  activeSeason: number;
  seasons: number;
  onClick?: (season: number) => void;
}

const ResponsiveBreakPoints = [
  {
    breakpoint: screenSizes.large,
    settings: {
      slidesToShow: 9,
      slidesToScroll: 9,
      infinite: false,
      dots: false,
    },
  },
  {
    breakpoint: screenSizes.medium,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6,
      infinite: false,
      dots: false,
    },
  },
];

const SeasonCarousel = ({ activeSeason, seasons, onClick }: Props) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    season: number
  ) => {
    if (onClick) {
      onClick(season);
    }
  };

  const children = [];
  for (let i = 1; i <= seasons; i++) {
    children.push(
      <SeasonSlide
        $isActive={i === activeSeason}
        variant="link"
        size="small"
        key={i}
        value={i}
        onClick={handleClick}
      >
        Season {i}
      </SeasonSlide>
    );
  }

  return (
    <StyledCarousel
      dots={false}
      slidesToShow={12}
      slidesToScroll={12}
      infinite={false}
      responsive={ResponsiveBreakPoints}
    >
      {children}
    </StyledCarousel>
  );
};

const SeasonSlide = styled(Button)<{ $isActive: boolean }>`
  width: auto !important;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: ${(props) => props.theme.colors.white.secondary};

  ${(props) =>
    props.$isActive &&
    css`
      color: ${props.theme.colors.white.default};
      font-weight: bold;
    `}
`;

const StyledCarousel = styled(Carousel)`
  &&& {
    .slick-slide {
      padding: 0;
    }
  }
`;

export default SeasonCarousel;
