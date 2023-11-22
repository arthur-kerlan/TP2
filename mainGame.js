var config = {
    type: Phaser.CANVAS,
    width: '100%',
    height: '50%',
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
let gameOver = false;

var game =  new Phaser.Game(config);

var player;

var ground;
const groundWidth = 1200;
const groundHeight = 24;
var groundInitialVelocity = -400;
var cactus1

var cursors;

var static_ground;

function preload(){

    this.load.image('ground', 'imgs/gameFrames/ground.png');
    this.load.spritesheet('dino', 'imgs/gameFrames/2x-trex.png',{frameWidth: 88, frameHight: 94});
    this.load.image('cactus1','imgs/gameFrames/cactus_1.png');
}

function create(){

    const alturaJogo = this.sys.canvas.height;
    const larguraJogo = this.sys.canvas.width;
    
    //ground = this.physics.add.sprite(0, 368, 'ground').setOrigin(0,0);
    ground = this.physics.add.group({
        key: 'ground',
        repeat: 2,
        setXY: {x: 0, y: alturaJogo-10, stepX: groundWidth*2}
    });

    ground.children.iterate((child) =>{
        child.setVelocityX(groundInitialVelocity);
    });

    var ground_colisor = this.physics.add.staticSprite(0,alturaJogo+20).setOrigin(0,0);
    ground_colisor.body.width = groundWidth*2;


    static_ground = this.physics.add.staticSprite('0%', alturaJogo+10).setOrigin(0,0);
    static_ground.body.height = 1;
    static_ground.body.width = groundWidth*2;

    player = this.physics.add.sprite(50, alturaJogo-94, 'dino').setOrigin(0,0);


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
    this.anims.create({
        key: 'death',
        frames: [ { key: 'dino', frame: 5 } ],
        frameRate: 1,
    });

    cactus1 = this.physics.add.sprite(larguraJogo, alturaJogo-100-18, 'cactus1').setOrigin(0,0);
    cactus1.setVelocityX(groundInitialVelocity);

    this.physics.add.collider(player, static_ground);
    this.physics.add.collider(ground, ground_colisor);
    this.physics.add.collider(cactus1, static_ground);

    this.physics.add.overlap(player, cactus1, (player, colisor) => {
        this.physics.pause();

        player.anims.play('death');

        gameOver = true;
    }, null, this);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){

    const larguraJogo = this.sys.canvas.width;

    ground.children.iterate((child) =>{
        
            if(child.body.x <= groundWidth*(-2))
                child.body.x = larguraJogo;

    });

    if(cactus1.body.x  <= -48)
        cactus1.body.x = larguraJogo;

    if (cursors.up.isDown && player.body.touching.down && gameOver != true)
    {
        player.anims.play('stand');
        player.setVelocityY(-1500);
    }

    else if(player.body.touching.down && gameOver != true){
        
        player.anims.play('walking', 'stand');
    }

    
}
