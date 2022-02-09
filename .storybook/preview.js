import React from "react";

import { ThemeProvider } from "styled-components/macro";
import { defaultTheme } from "../src/styles/theme";
import GlobalStyle from "../src/styles/global";

//add support for Styled Components
export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
