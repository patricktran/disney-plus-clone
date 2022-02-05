import { createGlobalStyle } from "styled-components/macro";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #040714;
  color: ${(props) => props.theme.colors.white.default};
  font-family: "Lato", sans-serif !important;
}

button,
h2,
p,
h1,
h3,
h4,
h5,
a,
input,
div {
  font-family: "Lato", sans-serif;
}

video{
  object-fit: contain;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

progress {
  vertical-align: baseline;
}
`;

export default GlobalStyle;
