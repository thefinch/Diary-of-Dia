// Import Assets Here
import logoImg from "../assets/logo.png";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {
        let loadBarOuter = this.add.rectangle(200, 300, 400, 50, 0x333333);
        let loadBarInner = this.add.rectangle(208, 308, 384, 34, 0x777777);
        loadBarOuter.setOrigin(0, 0);
        loadBarInner.setOrigin(0, 0);

        let percentText = this.make.text({
            x: 400,
            y: 325,
            text: '0%',
            style: {
                font: '16pt monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // Get Loading Progress every time it changes
        this.load.on("progress", value => { // value = % Finished Loading
            percentText.setText(parseInt(value * 100) + '%');
            loadBarInner.displayWidth = 384 * value;
        });

        // Call this when the loading is finished
        this.load.on("complete", () => {
            this.scene.start('titleScene');
        });

        // Load Assets here
        this.load.image("logo", logoImg);
    }

    create() {
        
    }
}