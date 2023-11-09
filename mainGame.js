var config = {
    type: Phaser.AUTO,
    width: 1580,
    height: 200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload : preload,
        create : create,
        update : update
    }
};

var game =  new Phaser.Game(config);

var player;

var static_ground;

function preload(){
    this.load.image('ground', 'imgs/gameFrames/ground.png');
    this.load.spritesheet('dino', 'imgs/gameFrames/2x-trex.png',{frameWidth: 88, frameHight: 94});
    
}

function create(){
    
    static_ground = this.physics.add.staticGroup();

    static_ground.create(0, 172, 'ground').setOrigin(0, 0);

    player = this.physics.add.sprite(100, 450, 'dino');

    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'walking',
        frames: this.anims.generateFrameNumbers('dino', { start: 2, end: 3 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'stand',
        frames: [ { key: 'dino', frame: 0 } ],
        frameRate: 1,
        repeat: -1
    });

    this.physics.add.collider(player, static_ground);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){

    

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.anims.play('stand');
        player.setVelocityY(-330);
    }
    else if(player.body.touching.down){
        player.anims.play('walking', 'stand');
    }
}
