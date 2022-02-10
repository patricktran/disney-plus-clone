import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/macro";

import Routes from "routes";
import queryClient from "state/services/react-query/query-client";
import GlobalStyle from "styles/global";
import { defaultTheme } from "styles/theme";
import AppContext from "utils/app-context";
import AppContainer from "views/layouts/app-container";

import store from "./state/store";

// hydrate AppContent with environment variables
AppContext.HydrateConfig();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <AppContainer>
          <Routes />
        </AppContainer>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
