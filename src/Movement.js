class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 500
    }

    preload() {
        this.load.spritesheet('character','./assets/spritesheets/Character_002.png',{
            frameWidth: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)

        // better to make an animation in the booting scene as it only has to be done once
        // create animations
        this.anims.create({
            key: "idle-down",
            // if it has a moving animation, framerate will be different
            frameRate: 0,
            // repeat: -1 is infinie
            repeat: -1,
            // 움직이는 애니메이션 있을 때에 아래 숫자 조정하기
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })

        })

        this.anims.create({
            key: "walk-down",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })

        })

        // enable physics sprite
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        // do not let the character exit the screen
        this.player.body.setCollideWorldBounds(true)

        this.player.body.setSize(32, 32).setOffset(8,16)

        cursors = this.input.keyboard.createCursorKeys()

        
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0,0)
        let playerDirection = "down"

        // handle left/right
        if(cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = "left"
        } else if(cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = "right"
        }

        // handle up/down
        if(cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = "up"
        } else if(cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = "down"
        }

        playerVector.normalize()

        // directly manipulating x, y value
        // this.player.x += playerVector.x * this.PLAYER_VELOCITY
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        // evaluate this operation / if true execution / if false execute this
        playerVector.length() ? playerMovement = "walk" : playerMovement = "idle"
        // last true -  to not reset everytime
        this.player.play(playerMovement + "-" + playerDirection, true)
    }
}