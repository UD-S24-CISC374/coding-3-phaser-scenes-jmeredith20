import Phaser from "phaser";

export default class SceneBegin extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private endgame?: Phaser.Physics.Arcade.Group;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private startText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "SceneBegin" });
    }

    create() {
        this.add.image(400, 300, "black");
        this.platforms = this.physics.add.staticGroup();
        this.endgame = this.physics.add.group();

        const ground = this.platforms.create(
            400,
            580,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;

        ground.setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.physics.add.collider(this.endgame, this.platforms);

        this.endgame.create(700, 500, "house");

        this.startText = this.add.text(
            50,
            150,
            "Welcome!!\n   1. There are 4 levels to this game.\n   2. Collect all of the items and enter the next stage\n      door to progress.\n   3. Next stage doors do not appear until all items\n      are collected.\n   4. If hit by a bomb, you lose and game will reset.\n   5. User arrow keys to navigate character.\n   6. Enter the house on the right to begin level 1.",
            {
                fontSize: "20px",
                color: "#fff",
            }
        );

        this.physics.add.overlap(
            this.player,
            this.endgame,
            this.handleEndgame,
            undefined,
            this
        );
    }

    private handleEndgame() {
        this.scene.start("SceneOne");
    }

    update() {
        if (!this.cursors) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn", true);
        }

        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-330);
        } else if (
            this.cursors.down.isDown &&
            !this.player?.body?.touching.down
        ) {
            this.player?.setVelocityY(500);
        }
    }
}
