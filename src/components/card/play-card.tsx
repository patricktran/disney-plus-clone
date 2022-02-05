import styled from "styled-components/macro";

import Typography from "components/typography";

import Card, { CardProps } from "./card";
import PlayIcon from "./shared/play-icon";

interface Props {
  title?: string;
  description?: string;
}

interface PlayCardProps extends Props, Omit<CardProps, "children"> {}

const PlayCard = ({
  title,
  description,
  imageSrc,
  onHoverImageSrc,
  onHoverVideoSrc,
}: PlayCardProps) => {
  return (
    <Container>
      <Card
        imageSrc={imageSrc}
        onHoverImageSrc={onHoverImageSrc}
        onHoverVideoSrc={onHoverVideoSrc}
      >
        <StyledPlayIcon />
        <Metadata>
          <Title variant="p" weight={700}>
            {title}
          </Title>
          <Description variant="pxs">{description}</Description>
        </Metadata>
      </Card>
    </Container>
  );
};

export default PlayCard;
const Container = styled.div`
  position: relative;
`;

const Metadata = styled.div`
  padding: 8px 0px 12px;
  bottom: 0px;
  position: absolute;
  //trick - this will cause the slick react arrows to vertically center only with the thumbnail
  transform: translateY(100%);
`;

const StyledPlayIcon = styled(PlayIcon)`
  ${Container}:hover & {
    opacity: 1;
  }
`;

const Title = styled(Typography)`
  font-size: 15px;
  line-height: 1.53;
  padding-bottom: 6px;
`;

const Description = styled(Typography)`
  font-size: 12px;
  color: ${(props) => props.theme.colors.white.secondary};
`;
