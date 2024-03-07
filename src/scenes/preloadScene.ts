import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //All Scene Requirement
        this.load.image("bomb", "assets/bomb.png");

        //Scene 1 Requirements
        this.load.image("sky", "assets/sky.png");
        this.load.image("house", "assets/house.png");
        this.load.image("bone", "assets/bone.png");
        this.load.image("ground", "assets/platform.png");

        //Scene 2 Requirements
        this.load.image("cabin", "assets/cabin.png");
        this.load.image("portal", "assets/portal.png");
        this.load.image("meat", "assets/meat.png");
        this.load.image("log", "assets/log.png");
        /*
        //Scene 3 Requirements
        this.load.image("space", "assets/space.png");
        this.load.image("portal", "assets/portal.png");
        this.load.image("amongus", "assets/amongus.png");
        this.load.image("spaceground", "assets/spaceground.png");

        //Scene 4 Requirements
        this.load.image("space", "assets/space.png");
        this.load.image("portal", "assets/portal.png");
        this.load.image("star", "assets/star.png");
        this.load.image("ground", "assets/platform.png");
*/

        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.scene.start("SceneOne");
    }
}
