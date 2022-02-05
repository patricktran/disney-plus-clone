import styled from "styled-components/macro";

import Icon from "components/icon";

interface Props {
  className?: string;
}

const PlayIcon = ({ className }: Props) => {
  return <StyledIcon className={className} name="play-light" />;
};

export default PlayIcon;

const StyledIcon = styled(Icon)`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  left: 16px;
  bottom: 14px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgb(249, 249, 249);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  transition: all 300ms ease-out 0s;
  z-index: 12;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 12px;
    height: auto;
  }
`;
