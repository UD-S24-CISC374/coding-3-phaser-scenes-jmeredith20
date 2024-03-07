import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //All Scene Requirement
        this.load.image("bomb", "assets/bomb.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });

        //Scene Begin Requirements:
        this.load.image("black", "assets/black.png");

        //Scene 1 Requirements
        this.load.image("sky", "assets/sky.png");
        this.load.image("house", "assets/house.png");
        this.load.image("bone", "assets/bone.png");
        this.load.image("ground", "assets/dirt.png");

        //Scene 2 Requirements
        this.load.image("cabin", "assets/cabin.png");
        this.load.image("portal", "assets/portal.png");
        this.load.image("meat", "assets/meat.png");
        this.load.image("log", "assets/log.png");

        //Scene 3 Requirements
        this.load.image("space", "assets/space.png");
        this.load.image("ufo", "assets/ufo.png");
        this.load.image("amongus", "assets/amongus.png");
        this.load.image("spaceground", "assets/spaceground.png");

        //Scene 4 Requirements
        this.load.image("ship", "assets/ship.png");
        this.load.image("end", "assets/golf.png");
        this.load.image("alien", "assets/alien.png");
        this.load.image("pipe", "assets/pipe.png");
    }

    create() {
        this.scene.start("SceneBegin");
    }
}
