import * as THREE from "three";
import Experience from "../Experience.js";

export default class Person {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("person");
    }

    // Resource
    this.resource = this.resources.items.person;

    this.setModel();
    // this.setMaterial();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(2, 2, 2);
    this.model.position.y -= 0.2;
    this.model.position.x = 1.5;
    this.model.rotation.y = Math.PI * 1.1;
    this.scene.add(this.model);
  }

  setMaterial() {
    this.material = new THREE.MeshMatcapMaterial({
      matcap: this.resources.items.testMatcap,
    });

    this.model.traverse((child) => {
      child.material = this.material;
    });
  }

  setAnimation() {
    this.animation = {};

    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // Actions
    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.fly = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    // this.animation.actions.running = this.animation.mixer.clipAction(
    //   this.resource.animations[2]
    // );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // Play the action
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };

    // Debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("fly");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
