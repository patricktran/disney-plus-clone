// @ts-nocheck
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const STEP = 10;

const ForwardTenButton = class extends shaka.ui.Element {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   */
  constructor(parent, controls) {
    super(parent, controls);

    /** @private {!HTMLButtonElement} */
    this.button_ = document.createElement("button");
    this.button_.classList.add("material-icons-round");
    this.button_.classList.add("shaka-forward-ten-button");
    this.button_.textContent = "forward_10";
    this.button_.ariaLabel = "Forward 10";
    this.parent.appendChild(this.button_);

    this.eventManager.listen(this.button_, "click", () => {
      this.forward_();
    });
  }

  forward_() {
    if (!this.video.duration) {
      return;
    }

    if (this.video.currentTime + STEP < this.video.duration) {
      this.video.currentTime += STEP;
    } else {
      // if forwarding exceeds video duration, move to last STEP (10) seconds
      this.video.currentTime = this.video.duration - STEP;
    }
  }
};

ForwardTenButton.Factory = class {
  /** @override */
  create(rootElement: any, controls: any) {
    return new ForwardTenButton(rootElement, controls);
  }
};

export default ForwardTenButton;
