import styled from "styled-components/macro";

import Typography from "components/typography";
import { catalogTypes } from "state/ducks/catalog";

import Card, { CardProps } from "./card";
import PlayIcon from "./shared/play-icon";

interface Props {
  title?: string;
  subTitle?: string;
  progressValue?: number;
  showProgressBar?: boolean;
  programType: catalogTypes.ProgramType;
  /** remaining time in minutes */
  remaingTimeM?: number;
}

interface ProgressCardProps extends Props, Omit<CardProps, "children"> {}

const ProgressCard = ({
  title,
  subTitle,
  imageSrc,
  progressValue = 0,
  showProgressBar = true,
  onHoverImageSrc,
  onHoverVideoSrc,
  programType,
  remaingTimeM = 0,
}: ProgressCardProps) => {
  if (progressValue < 0 || progressValue > 100) {
    console.warn("progressValue needs to be a number between 0 and 100");
  }

  return (
    <Container>
      <Card
        imageSrc={imageSrc}
        onHoverImageSrc={onHoverImageSrc}
        onHoverVideoSrc={onHoverVideoSrc}
      >
        <Metadata>
          {programType === "movie" && title && (
            <Typography variant="h3">{title}</Typography>
          )}
          {programType === "episode" && title && (
            <Typography variant="p">{title}</Typography>
          )}
          {programType === "episode" && subTitle && (
            <Typography variant="h3">{subTitle}</Typography>
          )}
          <StyledPlayIcon />
          {remaingTimeM > 0 && (
            <RemainingTime>{remaingTimeM}m remaining</RemainingTime>
          )}
        </Metadata>
        {showProgressBar && (
          <Progress max="100" value={progressValue.toString()} />
        )}
      </Card>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Metadata = styled.div`
  bottom: 0px;
  position: absolute;
  transition: all 300ms ease-out 0s;
  width: 100%;
  height: 100%;
  padding: 10px 16px 26px;
  opacity: 0;

  p {
    font-size: 15px;
  }

  h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 3px !important;
  }

  ${Container}:hover & {
    background: rgba(0, 0, 0, 0.7);
    z-index: 30;
    opacity: 1;
  }
`;

const StyledPlayIcon = styled(PlayIcon)`
  bottom: 28px;

  ${Container}:hover & {
    opacity: 1;
  }
`;

const RemainingTime = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.white.secondary};
  bottom: 0px;
  position: absolute;
  right: 0px;
  margin-bottom: 2rem;
  margin-right: 1rem;
`;

const Progress = styled.progress`
  appearance: none;
  border-radius: 0px 0px 4px 4px;
  bottom: 0px;
  height: 6px;
  left: 0px;
  overflow: hidden;
  position: absolute;
  right: 0px;
  transition: all 300ms ease-out 0s;
  width: 99.5%;
  z-index: 40;

  &::-webkit-progress-bar {
    background: rgba(249, 249, 249, 0.3);
  }

  &::-webkit-progress-value {
    background: rgb(2, 231, 245);
    transition: width 0.2s ease-in-out 0s;
  }

  ${Container}:hover & {
    bottom: 12px;
    margin: 0px 16px;
    width: calc(100% - 32px);
    border-radius: 50px;
  }
`;

export default ProgressCard;
