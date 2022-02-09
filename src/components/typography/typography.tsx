import React from "react";

import styled, { StyledComponent, css } from "styled-components/macro";

type Variant = "h1" | "h2" | "h3" | "h4" | "pl" | "p" | "ps" | "pxs" | "cta";
type Weight = 700;

interface Props {
  children?: React.ReactNode;
  className?: string;
  variant: Variant;
  weight?: Weight;
}

type StyledProps = { $weight: Weight };

const weightModifier = (props: StyledProps) =>
  props.$weight &&
  css`
    font-weight: ${props.$weight};
  `;

const H1 = styled.h1<StyledProps>`
  font-size: 45px;
  line-height: 56px;
  letter-spacing: 0.25px;
  font-weight: 300;

  ${(props) => weightModifier(props)}
`;

const H2 = styled.h2<StyledProps>`
  font-size: 22px;
  line-height: 32px;
  letter-spacing: 0.25px;
  font-weight: 500;

  ${(props) => weightModifier(props)}
`;

const H3 = styled.h3<StyledProps>`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.25px;
  font-weight: 500;

  ${(props) => weightModifier(props)}
`;

const H4 = styled.h4<StyledProps>`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  font-weight: 500;

  ${(props) => weightModifier(props)}
`;

const ParagraphLarge = styled.p<StyledProps>`
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;

  ${(props) => weightModifier(props)}
`;

const Paragraph = styled.p<StyledProps>`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;

  ${(props) => weightModifier(props)}
`;

const ParagraphSmall = styled.p<StyledProps>`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;

  ${(props) => weightModifier(props)}
`;

const ParagraphXSmall = styled.p<StyledProps>`
  font-size: 11px;
  line-height: 16px;
  font-weight: 400;

  ${(props) => weightModifier(props)}
`;

const CTA = styled.span<StyledProps>`
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;

  ${(props) => weightModifier(props)}
`;

interface VariantRecord {
  Component: StyledComponent<any, any, any>;
}

const variantMapping: Record<Variant, VariantRecord> = {
  h1: { Component: H1 },
  h2: { Component: H2 },
  h3: { Component: H3 },
  h4: { Component: H4 },
  pl: { Component: ParagraphLarge },
  p: { Component: Paragraph },
  ps: { Component: ParagraphSmall },
  pxs: { Component: ParagraphXSmall },
  cta: { Component: CTA },
};

const Typography = ({
  children,
  className,
  variant,
  weight,
  ...props
}: React.HTMLProps<HTMLElement> & Props) => {
  const { Component } = variantMapping[variant];
  // cast component due to TS
  const CastedComponent = Component as
    | React.ElementType
    | keyof JSX.IntrinsicElements;

  return (
    <CastedComponent className={className} $weight={weight} {...props}>
      {children}
    </CastedComponent>
  );
};

export default Typography;
