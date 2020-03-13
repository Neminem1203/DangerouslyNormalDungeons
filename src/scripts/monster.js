
var octopusIMG = new Image();
octopusIMG.src = "https://image.flaticon.com/icons/svg/2196/2196893.svg";

var octopusATK = new Image();
octopusATK.src = "https://image.flaticon.com/icons/svg/651/651510.svg";

var vampireIMG = new Image();
vampireIMG.src = "https://image.flaticon.com/icons/svg/2286/2286964.svg";

var vampireATK = new Image();
vampireATK.src = "https://image.flaticon.com/icons/svg/209/209853.svg";

var werewolfIMG = new Image();
werewolfIMG.src = "https://image.flaticon.com/icons/svg/2534/2534552.svg";

var werewolfATK = new Image();
werewolfATK.src = "https://image.flaticon.com/icons/svg/2068/2068587.svg";

var reaperIMG = new Image();
reaperIMG.src = "https://image.flaticon.com/icons/svg/2624/2624475.svg";

var reaperATK = new Image();
reaperATK.src = "https://image.flaticon.com/icons/svg/2674/2674440.svg";

export class Monster{
    constructor(type, x, y){
        switch(type){
            case "o":
                this.name = "Octopus";
                this.currentHP = 100;
                this.maxHP = 100;
                this.monsterIMG = octopusIMG;
                this.monsterATK = octopusATK;
                this.dmg = 10;
                this.drops = ["HP", "G"]
                break;
            case "w":
                this.name = "Werewolf";
                this.currentHP = 150;
                this.maxHP = 150;
                this.monsterIMG = werewolfIMG;
                this.monsterATK = werewolfATK;
                this.dmg = 20;
                this.drops = ["HP", "G", "ATK"]
                break;
            case "v":
                this.name = "Vampire";
                this.currentHP = 200;
                this.maxHP = 200;
                this.monsterIMG = vampireIMG;
                this.monsterATK = vampireATK;
                this.dmg = 50;
                break;
            case "r":
                this.name = "Reaper";
                this.currentHP = 1000;
                this.maxHP = 1000;
                this.monsterIMG = reaperIMG;
                this.monsterATK = reaperATK;
                this.dmg = 90;
                break;
            default:
                this.name = "Unknown";
                this.currentHP = 1;
                this.maxHP = 1;
                this.monsterIMG = octopusIMG;
                this.monsterATK = octopusATK;
                this.dmg = 1;
        }
        this.x = x;
        this.y = y;
        this.attackX = null;
        this.attackY = null;
        this.moved = false;
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
