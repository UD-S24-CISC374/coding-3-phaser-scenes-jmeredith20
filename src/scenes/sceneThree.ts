import Phaser from "phaser";

export default class SceneThree extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private endgame?: Phaser.Physics.Arcade.Group;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;

    private score = 12;
    private scoreText?: Phaser.GameObjects.Text;

    private bombs?: Phaser.Physics.Arcade.Group;

    constructor() {
        super({ key: "SceneThree" });
    }

    create() {
        this.add.image(400, 300, "space");
        this.platforms = this.physics.add.staticGroup();
        this.endgame = this.physics.add.group();

        const ground = this.platforms.create(
            400,
            580,
            "spaceground"
        ) as Phaser.Physics.Arcade.Sprite;

        ground.setScale(2).refreshBody();

        this.platforms.create(400, 400, "spaceground");
        this.platforms.create(400, 300, "spaceground");
        this.platforms.create(400, 200, "spaceground");
        this.platforms.create(400, 200, "spaceground");
        this.platforms.create(400, 200, "spaceground");

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

        this.stars = this.physics.add.group({
            key: "amongus",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.endgame, this.platforms);

        this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.endgame,
            this.handleEndgame,
            undefined,
            this
        );

        this.scoreText = this.add.text(16, 16, "Remaining Items: 12", {
            fontSize: "32px",
            color: "#fff",
        });

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(
            this.player,
            this.bombs,
            this.handleHitBomb,
            undefined,
            this
        );

        for (var i = 0; i < 4; i++) {
            var x =
                this.player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);

            const bomb: Phaser.Physics.Arcade.Image = this.bombs.create(
                x,
                16,
                "bomb"
            );
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    // Game restart if bomb is hit
    private handleHitBomb() {
        this.score = 12;
        this.scene.start("SceneBegin");
    }

    private handleEndgame() {
        this.score = 12;
        this.scene.start("SceneFour");
    }

    private handleCollectStar(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score -= 1;
        this.scoreText?.setText(`Remaining Items: ${this.score}`);

        if (this.stars?.countActive(true) === 0) {
            this.endgame?.create(700, 500, "ufo");
        }
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
