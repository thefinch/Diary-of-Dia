// Objects
import Popup from "../objects/Popup.js";
import Button from "../objects/Button.js";

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
		let startBtn = new Button(this, 266, 450, "New Game", (pointer, localX, localY, event) => {
    		console.log("started!");
    		this.scene.restart();
		});

		// Save/Load Button
		let loadBtn = new Button(this, 532, 450, "Load", (pointer, localX, localY, event) => {
			let popupConfig = {
				title: "Load",
				children: [
					{
						title: "Slot1",
						type: "Button",
						clickCallback: () => {loadData(this, 1)} // Function to call on click
					},
					{
						title: "Slot2",
						type: "Button",
						clickCallback: () => {loadData(this, 2)} // Function to call on click
					},
					{
						title: "Slot3",
						type: "Button",
						clickCallback: () => {loadData(this, 3)} // Function to call on click
					}
				],
				buttons: 3
			};
			let popup = new Popup(this, popupConfig);
		});

	}

	update() {

	}

}

function saveData(slot) {
	localStorage.setItem("dia.data", JSON.stringify(gameData)); // Using a . in key creates a namespace and prevents other sites from overwriting this key
	console.log(localStorage.getItem(`dia.data${slot}`));
}

function loadData(scene, slot) {
	let recievedData = JSON.parse(localStorage.getItem(`dia.dataSlot${slot}`));

	// Check if any data is saved
	if (recievedData) {
		gameData = recievedData;
		console.log(gameData);
	} else {
		console.log("No Data Found!");
		let loadWarnText = new FadingText(scene, 400, 144, "No Data Found!", {
			color: "#fff",
			fontSize: "32px",
			stroke: '#000',
    		strokeThickness: 4,
    		fontFamily: "Night Machine"
		});
	}
		
}

class FadingText extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.add.existing(this);

        this.setOrigin(0.5, 0.5);

        let timer = scene.time.addEvent({
		    delay: 10,                // ms
		    callback: () => this.changeOpacity(),
		    repeat: 20
		});
    }

    changeOpacity() {
    	this.setAlpha(this.alpha -= 0.05);
    	if (this.alpha <= 0) {
    		this.destroy();
    	}
    }

}