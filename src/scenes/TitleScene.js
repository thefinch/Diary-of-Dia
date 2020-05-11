// Objects
import Popup from "../objects/Popup.js";

// Variables
var gameData = {
	name: "player1",
	level: 5
} // Will contain player progress

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super("titleScene");
	}

	create() {
		// Logo(Placeholder)
		let logo = this.add.image(400, -128, "logo");
		logo.setScale(2);

		// Logo Tween Animation
		this.tweens.add({
		    targets: logo,
		    y: 192,
		    duration: 1000,
		    ease: "Power2",
		});


		// Start Button
		let startBtn = this.add.text(266, 450, "Start", { fontSize: "48px", fontFamily: "Night Machine" });
		startBtn.setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5);

		// Start Button Touch/Mouse Events
		startBtn.on("pointerdown", (pointer, localX, localY, event) => {
    		console.log("started!");
    		this.scene.restart();
		});
		startBtn.on("pointerover", (pointer, localX, localY, event) => startBtn.setColor("#999999"));
		startBtn.on("pointerout", (pointer, localX, localY, event) => startBtn.setColor("#ffffff"));


		// Save/Load Button
		let saveLoadBtn = this.add.text(532, 450, "Save/Load", { fontSize: "48px", fontFamily: "Night Machine" });
		saveLoadBtn.setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5);

		// Save/Load Button Touch/Mouse Events
		saveLoadBtn.on("pointerdown", (pointer, localX, localY, event) => {
			let popupConfig = {
				title: "Save/Load",
				children: [
					{
						title: "Save",
						type: "Button",
						clickCallback: () => {saveData()} // Function to call on click
					},
					{
						title: "Load",
						type: "Button",
						clickCallback: () => {loadData()} // Function to call on click
					}
				],
				buttons: 2
			};
			let popup = new Popup(this, popupConfig);
		});
		saveLoadBtn.on("pointerover", (pointer, localX, localY, event)=> saveLoadBtn.setColor("#999999"));
		saveLoadBtn.on("pointerout", (pointer, localX, localY, event) => saveLoadBtn.setColor("#ffffff"));


	}

	update() {

	}

}

function saveData() {
	localStorage.setItem("dia.data", JSON.stringify(gameData)); // Using a . in key creates a namespace and prevents other sites from overwriting this key
	console.log(localStorage.getItem("dia.data"));
}

function loadData() {
	gameData = JSON.parse(localStorage.getItem("dia.data"));
	console.log(gameData);
}