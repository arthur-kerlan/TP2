export default class Ptero{
    constructor(cena, InicialPos){
        this.cena = cena;
        this.InicialPos = InicialPos;
        this.larguraPtero = 90;
        this.alturaJogo = cena.sys.canvas.height;
        this.larguraJogo = cena.sys.canvas.width;
        
        this.sprite = cena.physics.add.sprite(InicialPos, this.alturaJogo-300, 'allSprites').setOrigin(0, 0);

        cena.anims.create({
            key: 'flying', 
            frames: cena.anims.generateFrameNumbers('allSprites', { start: 4, end: 3 }),
            frameRate: 10
        })

        cena.time.addEvent({ delay: 250, callback: () =>{this.sprite.play('flying')}, callbackScope: this, loop: true });
    }

    setVelocity(newVelocity){
        this.sprite.setVelocityX(newVelocity-50);
    }

    isDeath(){
        return this.sprite.body.x <= -this.larguraPtero-10;
    }

    replaceInitial(){
        this.sprite.setX(this.larguraJogo);
        this.sprite.setY(this.alturaJogo-270);
    }

    setBounce(newBounce){
        this.sprite.setBounce(newBounce);
    }

    disable(){
        this.sprite.disableBody();
    }
    enable(){
        this.sprite.enableBody();
    }
}