import { css } from "styled-components/macro";

import { Theme } from "../../theme";

export const featuredContainer = (theme: Theme) => css`
  padding: 0 0 20px;

  h3 {
    margin: 10px 0 12px;
    font-weight: 700;
  }
`;

export const featuredContainerContentGrid = (theme: Theme) => css`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media ${theme.deviceMinWidth.small} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media ${theme.deviceMinWidth.medium} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media ${theme.deviceMinWidth.large} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;
