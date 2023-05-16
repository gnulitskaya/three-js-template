import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    this.updateSizes();

    /**Resize Event Listener */
    window.addEventListener("resize", () => {
      this.updateSizes();
      this.trigger("resize");
    });
  }

  updateSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  getAbsoluteHeight(element) {
    const styles = window.getComputedStyle(element)
    const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

    return Math.ceil(element.offsetHeight + margin)
  }

  getMarginTop(element) {
    const styles = window.getComputedStyle(element)

    return Math.ceil(parseFloat(styles['marginTop']))
  }
}
