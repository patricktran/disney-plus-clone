import React from "react";

import styled, { css } from "styled-components/macro";

import { noop } from "utils/helpers/functional";

type Variant = "primary" | "secondary" | "link";
type Size = "small" | "medium";
type FontWeight = "normal" | "bold";

export interface ButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, value: any) => void;
  value?: any;
  variant?: Variant;
  size?: Size;
  fontWeight?: FontWeight;
  [key: string]: any; // ...rest
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick = noop,
  className,
  value,
  size = "medium",
  fontWeight = "normal",
  ...rest
}) => {
  const internalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e, value);
  };

  return (
    <ButtonContainer
      className={className}
      variant={variant}
      fontWeight={fontWeight}
      size={size}
      onClick={internalOnClick}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<ButtonProps>`
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  border: none;
  padding: 0px 10px;
  height: 35px;
  font-size: 10px;
  letter-spacing: 0.8px;

  &[disabled],
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  //primary modifier
  ${(props) =>
    props.variant === "primary" &&
    css`
      color: #000;
      background: ${props.theme.colors.white.default};

      &:hover {
        background: rgb(198, 198, 198);
      }
    `}

  //secondary modifier
  ${(props) =>
    props.variant === "secondary" &&
    css`
      color: ${props.theme.colors.white.default};
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid ${props.theme.colors.white.default};

      &:hover {
        background: rgba(198, 198, 198, 0.2);
      }
    `}

    //link modifier
    ${(props) =>
    props.variant === "link" &&
    css`
      color: ${props.theme.colors.white.default};
      background-color: transparent;
      border: none;
      cursor: pointer;
      text-decoration: none;
    `}

    //size medium modifier
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 12px;
      margin: 0 10px 0 0;
      padding: 0px 12px;
      height: 45px;

      @media ${props.theme.deviceMinWidth.medium} {
        font-size: 15px;
        padding: 0px 18px;
        height: 52px;
        margin: 0 22px 0 0;
      }
    `}

    //fontWeight bold modifier
    ${(props) =>
    props.fontWeight === "bold" &&
    css`
      font-weight: bold;
    `}
`;

export default Button;
