import Phaser from "phaser";

// Scenes
import LoadingScene from "./scenes/LoadingScene.js";
import TitleScene from "./scenes/TitleScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [LoadingScene, TitleScene]
};

const game = new Phaser.Game(config);