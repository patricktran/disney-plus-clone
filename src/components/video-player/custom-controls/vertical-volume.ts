// @ts-nocheck
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const VerticalVolume = class extends shaka.ui.Element {
  constructor(parent: any, controls: any) {
    super(parent, controls);

    // The actual button that will be displayed
    this.container_ = document.createElement("div");
    this.container_.classList.add("shaka-volume-container");
    new shaka.ui.MuteButton(this.container_, controls);
    new shaka.ui.VolumeBar(this.container_, controls);
    this.parent.appendChild(this.container_);

    // Listen for clicks on the container
    this.eventManager.listen(this.container_, "click", () => {
      // alert("hi");
    });
  }
};

// Factory that will create a button at run time.
VerticalVolume.Factory = class {
  create(rootElement: any, controls: any) {
    return new VerticalVolume(rootElement, controls);
  }
};

export default VerticalVolume;
