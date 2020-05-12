export default class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, text, clickCallback) {
        super(scene, x, y, 160, 48, 0xf4f4f4);
        scene.add.existing(this);

        // Button Text
		this.title = scene.add.text(this.x, this.y, text, {
			fontSize: "32px",
			fontFamily: "Night Machine",
			color: "#333333"
		});
		this.title.setOrigin(0.5, 0.5);

		// Adjust Width after adding Text
		if ((this.title.displayWidth + 16) > this.displayWidth) {
			this.displayWidth = this.title.displayWidth + 16;
		}

		// Click/Touch Events
		this.setInteractive({ useHandCursor: true });
		this.on("pointerdown", (pointer, localX, localY, event) => {
			clickCallback();
		});

		this.on("pointerover", (pointer, localX, localY, event) => {
			this.setFillStyle(0x777777, 1);
			this.title.setColor("#f4f4f4");
		});
		this.on("pointerout", (pointer, localX, localY, event) => {
			this.setFillStyle(0xffffff, 1);
			this.title.setColor("#333333");
		});

    }

    remove() {
    	this.title.destroy();
    	this.destroy();
    }
}