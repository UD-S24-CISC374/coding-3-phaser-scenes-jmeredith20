import Phaser from "phaser";
import PreloadScene from "./scenes/preloadScene";
import SceneBegin from "./scenes/sceneBegin";
import SceneOne from "./scenes/sceneOne";
import SceneTwo from "./scenes/sceneTwo";
import SceneThree from "./scenes/sceneThree";
import SceneFour from "./scenes/sceneFour";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

export const CONFIG = {
    title: "My Untitled Phaser 3 Game",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        PreloadScene,
        SceneBegin,
        SceneOne,
        SceneTwo,
        SceneThree,
        SceneFour,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
