import React, { useRef, useState, useEffect } from "react";

import Typography from "../typography";

const variants = ["h1", "h2", "h3", "h4", "p", "ps", "cta"] as const;

type TypographyStyles = {
  fontSize?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  weight?: string;
};

type TypographyProps = Parameters<typeof Typography>[0];
/**
 * Create a component that is able to inspect the styles applied to the
 * Typography component and expose them
 */
const TypographyRow: React.FC<TypographyProps> = (props: TypographyProps) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const [state, setState] = useState<TypographyStyles>({});
  useEffect(() => {
    const rowEl = rowRef.current;
    if (rowEl) {
      const typographyEl =
        rowEl.children[rowEl.childElementCount - 1].children[0];
      const styles = window.getComputedStyle(typographyEl, null);

      setState({
        fontFamily: styles.getPropertyValue("font-family"),
        fontSize: styles.getPropertyValue("font-size"),
        lineHeight: styles.getPropertyValue("line-height"),
        letterSpacing: styles.getPropertyValue("letter-spacing"),
        weight: styles.getPropertyValue("font-weight"),
      });
    }
  }, [rowRef]);

  const tdStyle = { padding: 5 };
  return (
    <tr ref={rowRef}>
      <td style={tdStyle}>{props.variant}</td>
      <td style={tdStyle}>{state.fontSize}</td>
      <td style={tdStyle}>{state.lineHeight}</td>
      <td style={tdStyle}>{state.letterSpacing}</td>
      <td style={tdStyle}>{state.weight}</td>
      <td style={tdStyle}>{state.fontFamily}</td>
      <td style={tdStyle}>
        <Typography {...props} />
      </td>
    </tr>
  );
};

export default {
  title: "Components/Typography",
};

export const Default = () => (
  <table>
    <thead>
      <tr>
        <th>Variant</th>
        <th>Font-size</th>
        <th>Line-height</th>
        <th>Letter-spacing</th>
        <th>Weight</th>
        <th>Font-family</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      {variants.map((variant) => {
        return (
          <TypographyRow key={variant} variant={variant}>
            Scale your creativity
          </TypographyRow>
        );
      })}
    </tbody>
  </table>
);

export const WeightStory = () => (
  <table>
    <thead>
      <tr>
        <th>Variant</th>
        <th>Font-size</th>
        <th>Line-height</th>
        <th>Letter-spacing</th>
        <th>Weight</th>
        <th>Font-family</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <TypographyRow variant="p">Scale your creativity - normal</TypographyRow>
      <TypographyRow variant="p" weight={700}>
        Scale your creativity - 700
      </TypographyRow>
      <TypographyRow variant="ps">Scale your creativity - normal</TypographyRow>
      <TypographyRow variant="ps" weight={700}>
        Scale your creativity - 700
      </TypographyRow>
    </tbody>
  </table>
);

Default.storyName = "Default";
WeightStory.storyName = "Weight";
