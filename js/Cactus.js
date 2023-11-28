export default class Cactus{
    constructor(cena, inicialPosition){
        this.cena = cena;
        this.alturaJogo = cena.sys.canvas.height;
        this.larguraJogo = cena.sys.canvas.width;
        this.alturaCactus = 100;
        this.larguraCactus = 48;
        this.inicialPosition = inicialPosition;

        this.sprite = cena.physics.add.sprite(inicialPosition, this.alturaJogo-this.alturaCactus-18, 'cactus1').setOrigin(0,0);
    }

    setVelocity(newVelocity){
        this.sprite.setVelocityX(newVelocity);
    }

    isDeath(){
        return this.sprite.body.x <= -this.larguraCactus-10;
    }

    replaceInitial(){
        this.sprite.setX(this.inicialPosition);
    }

    disable(){
        this.sprite.disableBody();
    }
    enable(){
        this.sprite.enableBody();
    }
}