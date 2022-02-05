import styled from "styled-components/macro";

import { ProgressCard } from "components/card";
import Typography from "components/typography";
import { catalogTypes } from "state/ducks/catalog";
import { useGetContinueWatchingQuery } from "state/services/";
import {
  featuredContainer,
  featuredContainerContentGrid,
} from "styles/placeholders/featured";

const ContinueWatching = () => {
  const { data, isFetching } = useGetContinueWatchingQuery();

  if (isFetching || !data || !data.length) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h3">Continue Watching</Typography>
      <Content>
        {data &&
          data.map((item, i) => (
            <ProgressCard
              key={i}
              programType={item.programType as catalogTypes.ProgramType}
              title={item.title}
              subTitle={item.subTitle}
              progressValue={item.progressValue}
              imageSrc={item.imageSrc}
              onHoverImageSrc={item.onHoverImageSrc}
              remaingTimeM={item.remainingTimeM}
            />
          ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => featuredContainer(props.theme)}
`;

const Content = styled.div`
  ${(props) => featuredContainerContentGrid(props.theme)}
`;

export default ContinueWatching;
