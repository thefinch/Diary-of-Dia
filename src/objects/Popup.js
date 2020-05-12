import Button from "./Button.js";

export default class Popup extends Phaser.GameObjects.Rectangle {
	constructor(scene, config) {
		super(scene, 400, 300, 600, 500, 0x333333);
		scene.add.existing(this);

		// Read Config
		this.titleText = config.title;
		this.children = [];

		// Add Title
		this.title = scene.add.text(400, 100, this.titleText, {
			fontSize: "48px",
			fontFamily: "Night Machine"
		});
		this.title.setOrigin(0.5, 0.5);

		// Close Button
		this.closeBtn = scene.add.text(668, 82, String.fromCharCode(215), {fontSize: "32px"});
		this.closeBtn.setInteractive({useHandCursor: true}).setOrigin(1, 0.5);
		this.closeBtn.on("pointerdown", (pointer, localX, localY, event) => {
			this.remove();
		});

		// Set Position for children(Buttons
		let posIncrement = (400 - (32 * config.buttons))/(config.buttons + 1); // 112
		let childPosition = {x: 400, y: 150+posIncrement};

		// Add Children
		for (let child in config.children) {

			// Buttons
			if (config.children[child].type.toLowerCase() === "button") {

				let currChild = config.children[child];
				addButton(scene, this, currChild.title, currChild.clickCallback, childPosition);

				childPosition.y += posIncrement;
			}
		}

	}

	remove() {
		this.title.destroy();
		this.closeBtn.destroy();
		this.children.forEach(el => el.remove());
		this.destroy();
	}
}

function addButton(scene, popup, title, clickCallback, position) {
	let button = new Button(scene, position.x, position.y, title, () => {clickCallback()});

	popup.children.push(button);
}