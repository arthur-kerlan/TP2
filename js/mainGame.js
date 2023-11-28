import Cactus from "./Cactus.js";
import JogadorDino from "./jogador.js";
import Meteor from "./Meteor.js";
import Ptero from './Ptero.js'

const config = {
    type: Phaser.CANVAS,
    width: '100%',
    height: '50%',
    backgroundColor: '#353535',
    parent: 'dino-main-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 4600 },
            debug: false
        }
    },
    scene: {
        preload : preload,
        create : create,
        update : update,
        onEvent: OnEvent
    }
};
let gameOver = false;

let game =  new Phaser.Game(config);

let player;


let ground;
const groundWidth = 1200;
let groundInitialVelocity = -400;
let currentGroundVelocity = groundInitialVelocity;

let cactus;

let ptero;

let meteor;

let cursors;

let static_ground;

let deadText;
const deadTextContent = 'precione space para reiniciar';
const deadTextConfig = {fontFamily: 'Arial', fontSize: '25px', fill: '#ffffff', align: 'center'}

let damageNpc = [];


function OnEvent(){
    let randomIndex = parseInt(Math.random() * 2.4);

    currentGroundVelocity -= 60;

    ground.children.iterate((child) =>{
        
        child.setVelocityX(currentGroundVelocity);
});
    damageNpc[randomIndex].enable();
    damageNpc[randomIndex].replaceInitial();

    if(randomIndex==2){
        if(damageNpc[randomIndex].isTouchingDown())
            damageNpc[randomIndex].setVelocity(currentGroundVelocity);
    }
    else
        damageNpc[randomIndex].setVelocity(currentGroundVelocity);
    
}

function preload(){

    this.load.image('ground', 'imgs/gameFrames/ground.png');
    this.load.spritesheet('dino', 'imgs/gameFrames/2x-trex.png',{frameWidth: 88, frameHight: 94});
    this.load.spritesheet('allSprites', 'imgs/gameFrames/sprite_sheet.png',{frameWidth: 87, frameHight: 94});
    this.load.image('cactus1','imgs/gameFrames/cactus_1.png');
    this.load.image('meteor', 'imgs/gameFrames/Meteor_min.png')
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

    player = new JogadorDino(this, 50);

    cactus = new Cactus(this, larguraJogo);
    

    ptero = new Ptero(this, larguraJogo)
    ptero.setBounce(1);
    

    meteor = new Meteor(this,larguraJogo,player.sprite);

    this.physics.add.collider(player.sprite, static_ground);
    this.physics.add.collider(ground, ground_colisor);
    this.physics.add.collider(cactus.sprite, static_ground);
    this.physics.add.collider(ptero.sprite, static_ground);
    this.physics.add.collider(meteor.sprite, ground_colisor);

    damageNpc.push(cactus);
    damageNpc.push(ptero);
    damageNpc.push(meteor);

    deadText = this.add.text(0, 0, deadTextContent, deadTextConfig);
    deadText.setVisible(false);

    damageNpc.forEach((element) => {
        this.physics.add.overlap(player.sprite, element.sprite, (player, colisor) => {

            player.anims.play('death');
            this.physics.pause();

            deadText.setVisible(true);
    
            gameOver = true;
        }, null, this);
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({ delay: 3000, callback: OnEvent, callbackScope: this, loop: true });
}

function update(){

    const larguraJogo = this.sys.canvas.width;

    ground.children.iterate((child) =>{
        
            if(child.body.x <= groundWidth*(-2))
                child.body.x = larguraJogo;

    });

    damageNpc.forEach(
        (element) => {
            if(gameOver == false)
                if(element.isDeath()){
                    element.setVelocity(0);
                    element.disable();
                }    
        }
    );


    if ((cursors.up.isDown || cursors.space.isDown)  && player.isTouchingDown() && gameOver != true)
    {
        player.jump();
    }

    else if(player.isTouchingDown() && gameOver != true){
        player.walking();
    }

    if(cursors.left.isDown){
        player.moveLeft();
    }
    else if(cursors.right.isDown){
        player.moveRight();
    }
    else{
        player.stopMoviment()
    }

    if(cursors.space.isDown && gameOver){
            player.replaceInitial();
            damageNpc.forEach((element)=>{
                element.setVelocity(0);
                element.replaceInitial();
                element.disable();
            })
            currentGroundVelocity = groundInitialVelocity;
            ground.children.iterate((child) =>{
        
                child.setVelocityX(groundInitialVelocity);
        });
            deadText.setVisible(false);
            this.physics.resume();
            gameOver = false;
        }
}
