import { useEffect, useState } from "react";

import styled from "styled-components/macro";

import { PlayCard, DummyCard } from "components/card";
import Carousel from "components/carousel";
import { useGetEpisodesQuery } from "state/services";
import { EpisodeItem } from "state/services/rtk-query/disneymock/types";
import { screenSizes } from "styles/theme";
import { shuffleArray } from "utils/helpers/functional";

interface Props {
  season: number;
  episodeCount: number;
}

const ResponsiveBreakPoints = [
  {
    breakpoint: screenSizes.xlarge,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
      infinite: false,
      dots: false,
    },
  },
  {
    breakpoint: screenSizes.large,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      dots: false,
    },
  },
  {
    breakpoint: screenSizes.medium,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: false,
      dots: false,
    },
  },
  {
    breakpoint: screenSizes.small,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: false,
      dots: false,
    },
  },
];

const EpisodeCarousel = ({ season, episodeCount }: Props) => {
  const { data, isFetching } = useGetEpisodesQuery(season);
  const [shuffledEpisodes, setShuffledEpisodes] = useState<EpisodeItem[]>([]);

  useEffect(() => {
    if (!isFetching && data?.length) {
      // randomize order - faking data
      setShuffledEpisodes(shuffleArray(data));
    }
  }, [isFetching, data, season]);

  return (
    <Container>
      <Carousel
        dots={false}
        slidesToShow={5}
        slidesToScroll={5}
        infinite={false}
        justify="left"
        responsive={ResponsiveBreakPoints}
      >
        {isFetching
          ? [...Array(episodeCount)].map((_, i) => {
              return <DummyCard key={i} />;
            })
          : shuffledEpisodes?.map((episode: any, index: number) => (
              <PlayCard
                key={Math.floor(Math.random() * 100 * episode.id)}
                imageSrc={episode.imageUrl}
                title={`${index + 1}. ${episode.title}`}
                description={episode.description}
              />
            ))}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  height: 160px;
`;

export default EpisodeCarousel;
