var config = {
    type: Phaser.CANVAS,
    width: '100%',
    height: 400,
    backgroundColor: '#353535',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 5000 },
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

var ground;

var cursors;

var static_ground;

function preload(){
    this.load.image('ground', 'imgs/gameFrames/ground.png');
    this.load.spritesheet('dino', 'imgs/gameFrames/2x-trex.png',{frameWidth: 88, frameHight: 94});
    
}

function create(){
    
    //ground = this.physics.add.sprite(0, 368, 'ground').setOrigin(0,0);
    ground = this.physics.add.group({
        key: 'ground',
        repeat: 2,
        setXY: {x: 1200, y: 368, stepX: 2400}
    });

    ground.children.iterate((child) =>{
        child.setVelocityX(-300);
    });

    var ground_colisor = this.physics.add.staticSprite(0,420).setOrigin(0,0);
    ground_colisor.body.width = 2400;


    static_ground = this.physics.add.staticSprite('0%', 410).setOrigin(0,0);
    static_ground.body.height = 1;
    static_ground.body.width = 2400;

    player = this.physics.add.sprite(100, 650, 'dino');

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
    this.physics.add.collider(ground, ground_colisor);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){

    ground.children.iterate((child) =>{
        
            if(child.body.x == -2400)
                child.body.x = 1600;
    });

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.anims.play('stand');
        player.setVelocityY(-1500);
    }

    else if(player.body.touching.down){
        
        player.anims.play('walking', 'stand');
    }
}
