export default class Meteor{
    constructor(cena, inicialPosition, following){
        this.cena = cena;
        this.following = following
        this.alturaJogo = cena.sys.canvas.height;
        this.larguraJogo = cena.sys.canvas.width;
        this.larguraMeteoro = 50;
        this.inicialPosition = inicialPosition;

        this.sprite = cena.physics.add.sprite(inicialPosition, -100, 'meteor').setOrigin(0,0);
    }
    isTouchingDown(){
        return this.sprite.body.touching.down;
    }

    setVelocity(newVelocity){
        this.sprite.setVelocityX(newVelocity);
    }

    isDeath(){
        return this.sprite.body.x <= -this.larguraMeteoro-10;
    }

    replaceInitial(){
        this.sprite.setX(this.following.body.x+550);
        this.sprite.setY(-50)
    }
    disable(){
        this.sprite.disableBody();
    }
    enable(){
        this.sprite.enableBody();
    }
}