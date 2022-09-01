import styled from "styled-components/macro";

import PageContainer from "views/layouts/page-container";
import Brands from "views/modules/brands";
import Featured, { ContinueWatching } from "views/modules/featured";
import HeroCarousel from "views/modules/hero-carousel";

const Home = () => {
  return (
    <PageContainer>
      <Spacer />
      <HeroCarousel />
      <Brands />
      <Featured title="All" collectionType="all" useCarousel={true} />
      <ContinueWatching />
      <Featured
        title="Marvel Origin Stories"
        collectionType="origin"
        cardLayout="portrait"
      />
      <Featured title="Recommended For You" collectionType="recommend" />
      <Featured title="New to Disney+" collectionType="new" />
      <Featured title="Originals" collectionType="original" />
      <Featured title="Trending" collectionType="trending" />
    </PageContainer>
  );
};

const Spacer = styled.div`
  margin-top: 32px;
`;

export default Home;
