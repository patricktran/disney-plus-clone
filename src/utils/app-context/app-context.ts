import { AppConfig } from "./types";

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
}
