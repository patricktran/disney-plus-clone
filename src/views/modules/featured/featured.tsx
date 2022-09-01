import React from "react";

import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import Card, { CardLayoutType } from "components/card";
import Carousel from "components/carousel";
import Loader from "components/loader/loader";
import Typography from "components/typography";
import { catalogSelectors, catalogTypes } from "state/ducks/catalog";
import { useAppSelector } from "state/hooks";
import {
  featuredContainer,
  featuredContainerContentGrid,
} from "styles/placeholders/featured";

interface Props {
  title: string;
  collectionType: catalogTypes.CollectionType;
  useCarousel?: boolean;
  cardLayout?: CardLayoutType;
}

const Featured = ({
  title,
  collectionType,
  useCarousel = false,
  cardLayout,
}: Props) => {
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  const catalogByType = useAppSelector((state) =>
    catalogSelectors.getByCollectionType(state, collectionType)
  );

  const catalogIsLoading = useAppSelector(catalogSelectors.isLoading);

  // curry function
  const onClick = (itemId: number) => () => {
    navigate(`/detail/${itemId}`);
  };

  return (
    <Container>
      <Typography variant="h3">{title}</Typography>
      <Loader loading={catalogIsLoading}>
        <Content ref={ref} useCarousel={useCarousel}>
          {/* no carousel */}
          {inView &&
            !useCarousel &&
            catalogByType.map((item) => (
              <React.Fragment key={item.id}>
                {/* eslint-disable-next-line */}
                <a onClick={onClick(item.id)} key={item.id}>
                  <Card imageSrc={item.cardImg} layout={cardLayout} />
                </a>
              </React.Fragment>
            ))}
          {/* use carousel */}
          {inView && useCarousel && (
            <Carousel
              slidesToShow={5}
              slidesToScroll={5}
              infinite={false}
              dots={false}
            >
              {catalogByType.map((item) => (
                <React.Fragment key={item.id}>
                  {/* eslint-disable-next-line */}
                  <a onClick={onClick(item.id)}>
                    <Card imageSrc={item.cardImg} layout={cardLayout} />
                  </a>
                </React.Fragment>
              ))}
            </Carousel>
          )}
        </Content>
      </Loader>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => featuredContainer(props.theme)}
`;

const Content = styled.div<Pick<Props, "useCarousel">>`
  ${(props) => !props.useCarousel && featuredContainerContentGrid(props.theme)}
`;

export default Featured;
