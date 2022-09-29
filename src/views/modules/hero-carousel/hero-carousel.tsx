import styled, { css } from "styled-components/macro";

import Carousel from "components/carousel";
import Loader from "components/loader";
import { useGetHeroes } from "state/services";

const height = "250px";
interface HeroProps {
  imgSrc: string;
}

const Hero = ({ imgSrc }: HeroProps) => {
  return (
    <HeroImageContainer>
      {/* eslint-disable-next-line */}
      <HeroLink href="#">
        <img src={imgSrc} alt="" />
      </HeroLink>
    </HeroImageContainer>
  );
};

const HeroImageContainer = styled.div`
  cursor: pointer;
  position: relative;

  ${(props) => css`
    @media ${props.theme.deviceMinWidth.large} {
      min-height: ${height};
    }
  `}
`;

const HeroLink = styled.a`
  box-shadow: ${(props) => props.theme.boxShadow.default};
  cursor: default;
  display: block;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding-top: 25.6%;
  //padding: 4px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &::after {
    border-radius: 4px;
    border: 4px solid rgba(255, 255, 255, 0);
    inset: 0px;
    content: "";
    position: absolute;
    transition: border 200ms linear 0s;
  }

  &:hover::after {
    padding: 0px;
    border: 4px solid rgba(249, 249, 249, 0.8);
  }
`;

const HeroCarousel = () => {
  const { data, isLoading } = useGetHeroes();

  return (
    <Container>
      <StyledLoader loading={isLoading}>
        <Carousel lazyLoad="progressive">
          {data?.map((item, index) => (
            <Hero key={index} imgSrc={item.imageSrc} />
          ))}
        </Carousel>
      </StyledLoader>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
`;

const StyledLoader = styled(Loader)`
  height: ${height};
`;

export default HeroCarousel;
