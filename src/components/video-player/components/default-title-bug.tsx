import styled from "styled-components/macro";

import Typography from "components/typography";

interface Props {
  onClick: () => void;
  title: string;
}

const DefaultTitleBug = ({ onClick, title }: Props) => {
  return (
    <TitleBugContainer onClick={onClick} role="button">
      <CaretBack />
      <StyledTypography weight={700} variant="h1">
        {title}
      </StyledTypography>
    </TitleBugContainer>
  );
};

const TitleBugContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  padding: 0 10px 10px 5px;
  position: relative;
  z-index: 100;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 26px;
  text-transform: capitalize;
`;

const CaretBack = styled.div`
  position: relative;

  &:before {
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: "";
    display: inline-block;
    position: relative;
    vertical-align: top;
    width: 17px;
    height: 17px;
    left: 3px;
    transform: rotate(-135deg);
  }
`;

export default DefaultTitleBug;
