/** Style Components - Theme
 * https://dev.to/rajuashok/create-styled-d-ts-to-make-typescript-work-with-styled-components-5dk4
 */

// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in mobile first design
export const screenSizes = {
  /** 576 */
  small: 576,
  /** 768 */
  medium: 768,
  /** 992 */
  large: 992,
  /** 1440 */
  xlarge: 1440,
};

const deviceMinWidth = {
  /** 576px */
  small: `(min-width: ${screenSizes.small}px)`,
  /** 768px */
  medium: `(min-width: ${screenSizes.medium}px)`,
  /** 992px */
  large: `(min-width: ${screenSizes.large}px)`,
  /** 1440px */
  xlarge: `(min-width: ${screenSizes.xlarge}px)`,
};

const colors = {
  white: {
    default: "#f9f9f9",
    secondary: "#cacaca",
  },
  blue: {
    default: "#0063e5",
  },
};

const boxShadow = {
  default:
    "rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px",
};

const mainHeader = {
  height: "72px",
};

export const defaultTheme = {
  colors,
  boxShadow,
  mainHeader,
  deviceMinWidth,
};

// infer theme type
export type Theme = typeof defaultTheme;

// add typescript autocomplete
declare module "styled-components/macro" {
  export interface DefaultTheme extends Theme {} // extends the global DefaultTheme with our ThemeType.
}
