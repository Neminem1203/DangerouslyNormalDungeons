
var octopusIMG = new Image();
octopusIMG.src = "https://image.flaticon.com/icons/svg/2196/2196893.svg";

var octopusATK = new Image();
octopusATK.src = "https://image.flaticon.com/icons/svg/651/651510.svg";

export class Monster{
    constructor(type, x, y){
        switch(type){
            case "o":
                this.name = "Octopus";
                this.currentHP = 100;
                this.maxHP = 100;
                this.monsterIMG = octopusIMG;
                this.monsterATK = octopusATK;
                break;
            case "v":
                this.name = "Vampire";
                this.currentHP = 200;
                this.maxHP = 200;
            default:
                this.name = "Unknown";
                this.currentHP = 1;
                this.maxHP = 1;
        }
        this.x = x;
        this.y = y;
        this.attackX = null;
        this.attackY = null;
    }

    takeDmg(dmg){
        this.currentHP -= dmg;
        return this.currentHP;
    }

    takeTurn(charX, charY){
        if(this.attackX !== null){
            // Attacking the character this turn
            return true // return true for attacking
        } else {
            if ((charX === this.x && Math.abs(charY-this.y) === 1) || (charY === this.y && Math.abs(charX - this.x) === 1)){
                this.attackX = charX;
                this.attackY = charY;
                return null;
            }
            //Move the monster towards the player
            return false // return false for not attacking
        }
        
    }
}
