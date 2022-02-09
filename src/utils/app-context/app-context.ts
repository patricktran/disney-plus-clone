import { AppConfig, AppConfigEnv } from "./types";

// Globally accessible Context - AppContext is hydrated at runtime at first load of the app
export default class AppContext {
  /** configuration values for current environment  */
  static Config = {} as AppConfig;

  /** Web only */
  static Web = {
    WindowRef: window,
    DocumentBody: window.document.body,
    OverlayRootEl:
      window.document.getElementById("overlay-root") ?? window.document.body,
  };

  /**
   * Hydrates Config using custom environment variables
   */
  static HydrateConfig() {
    // refer to .env-cmdrc
    AppContext.Config.env = process.env.REACT_APP_ENV as AppConfigEnv;
    AppContext.Config.api = {
      disneyBaseUrl: process.env.REACT_APP_DISNEY_API_BASEURL as string,
    };
  }
}
