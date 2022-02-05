// @ts-nocheck
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const RewindTenButton = class extends shaka.ui.Element {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    /** @private {!HTMLButtonElement} */
    this.button_ = document.createElement("button");
    this.button_.classList.add("material-icons-round");
    this.button_.classList.add("shaka-rewind-ten-button");
    this.button_.textContent = "replay_10";
    this.button_.ariaLabel = "Rewind 10";
    this.parent.appendChild(this.button_);

    this.eventManager.listen(this.button_, "click", () => {
      this.rewind_();
    });
  }

  rewind_() {
    if (!this.video.duration) {
      return;
    }

    if (this.video.currentTime - 10 < 0) {
      this.video.currentTime -= 10;
    } else {
      this.video.currentTime = 0;
    }
  }
};

RewindTenButton.Factory = class {
  /** @override */
  create(rootElement: any, controls: any) {
    return new RewindTenButton(rootElement, controls);
  }
};

export default RewindTenButton;
