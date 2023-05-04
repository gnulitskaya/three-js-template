import Experience from "../Experience.js";
import Person from "./Person.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.person = new Person();
    });
  }

  update() {
    if (this.person) this.person.update();
  }
}
