import styled, { css } from "styled-components/macro";

import DisneyBrand from "assets/images/viewers-disney.png";
import MarvelBrand from "assets/images/viewers-marvel.png";
import NationalBrand from "assets/images/viewers-national.png";
import PixarBrand from "assets/images/viewers-pixar.png";
import StarWarsBrand from "assets/images/viewers-starwars.png";
// @ts-ignore
import DisneyVideo from "assets/videos/disney.mp4";
// @ts-ignore
import MarvelVideo from "assets/videos/marvel.mp4";
// @ts-ignore
import NationalVideo from "assets/videos/national-geographic.mp4";
// @ts-ignore
import PixarVideo from "assets/videos/pixar.mp4";
// @ts-ignore
import StarWarsVideo from "assets/videos/star-wars.mp4";
import Card from "components/card";

const Brands = () => {
  return (
    <Container>
      <Brand
        borderRadius={10}
        hoverAssetPosition="behind"
        imageSrc={DisneyBrand}
        onHoverVideoSrc={DisneyVideo}
      />
      <Brand
        borderRadius={10}
        hoverAssetPosition="behind"
        imageSrc={PixarBrand}
        onHoverVideoSrc={PixarVideo}
      />
      <Brand
        borderRadius={10}
        hoverAssetPosition="behind"
        imageSrc={MarvelBrand}
        onHoverVideoSrc={MarvelVideo}
      />
      <Brand
        borderRadius={10}
        hoverAssetPosition="behind"
        imageSrc={StarWarsBrand}
        onHoverVideoSrc={StarWarsVideo}
      />
      <Brand
        borderRadius={10}
        hoverAssetPosition="behind"
        imageSrc={NationalBrand}
        onHoverVideoSrc={NationalVideo}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  padding: 18px 0px 16px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  ${(props) => css`
    @media ${props.theme.deviceMinWidth.medium} {
      padding: 18px 0px 18px;
    }
  `}
`;

const Brand = styled(Card)`
  cursor: default;

  &::after {
    border: 3px solid rgba(249, 249, 249, 0.1);
  }
`;

export default Brands;
