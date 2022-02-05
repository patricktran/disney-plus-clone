import classNames from "classnames";
import styled, { css } from "styled-components/macro";

import Icon, { IconName } from "./icon";

type Variant = "circular" | "simple";

interface Props {
  name: IconName;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>, value?: any) => void;
  value?: any;
  variant?: Variant;
  className?: string;
}

const IconButton = ({
  name,
  value,
  disabled,
  onClick,
  variant = "circular",
  className,
}: Props) => {
  const onIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      if (value !== undefined) {
        onClick(e, value);
      } else {
        onClick(e);
      }
    }
  };

  return (
    <Container
      onClick={onIconClick}
      className={classNames(`component__icon_button--${name}`, className, {
        disabled,
      })}
      $variant={variant}
    >
      <Icon name={name} />
    </Container>
  );
};

const Container = styled.div<{ $variant: Variant }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  height: 44px;
  width: 44px;
  cursor: pointer;

  ${(props) =>
    props.$variant === "circular" &&
    css`
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      border: 2px solid #fff;

      &:hover {
        background-color: rgba(0, 0, 0, 0.9);
      }
    `}

  &.disabled {
    opacity: 0.3;
    cursor: default;
  }

  img {
    width: 100%;
  }
`;

export default IconButton;
