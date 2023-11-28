export default class JogadorDino{
    constructor(cena, inicialPosition){
        this.cena = cena;
        this.inicialPosition = inicialPosition;
        this.alturaJogo = cena.sys.canvas.height;
        this.alturaDino = 94;

        this.sprite = cena.physics.add.sprite(inicialPosition, this.alturaJogo-this.alturaDino, 'dino').setOrigin(0,0);
        this.sprite.setCollideWorldBounds(true);

        this.x = this.sprite.body.x;
        this.y = this.sprite.body.y;

        cena.anims.create({
            key: 'walking',
            frames: cena.anims.generateFrameNumbers('dino', { start: 2, end: 3 }),
            frameRate: 10
        });
        cena.anims.create({
            key: 'stand',
            frames: [ { key: 'dino', frame: 0 } ],
            frameRate: 1,
            repeat: -1
        });
        cena.anims.create({
            key: 'death',
            frames: [ { key: 'dino', frame: 5 } ],
            frameRate: 1
        });
    }

    isTouchingDown(){
        return this.sprite.body.touching.down;
    }
    replaceInitial(){
        this.sprite.setX(this.inicialPosition);
    }

    jump(){
        this.sprite.anims.play('stand');
        this.sprite.setVelocityY(-1500);
    }
    walking(){
        this.sprite.anims.play('walking', 'stand');
    }
    moveLeft(){
        this.sprite.setVelocityX(-500);
    }
    moveRight(){
        this.sprite.setVelocityX(500)
    }
    stopMoviment(){
        this.sprite.setVelocityX(0);
    }
}