

// Random Number Generator
const rng = (num) => Math.floor(Math.random() * num) + 1;

var octopusIMG = new Image();
octopusIMG.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/octopusIMG.svg";

var octopusATK = new Image();
octopusATK.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/octopusATK.svg";

var vampireIMG = new Image();
vampireIMG.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/vampire.svg";

var vampireATK = new Image();
vampireATK.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/V1ampireFang.svg";

var werewolfIMG = new Image();
werewolfIMG.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/werewolf.svg";

var werewolfATK = new Image();
werewolfATK.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/WerewolfFang.svg";

var reaperIMG = new Image();
reaperIMG.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/devil.svg";

var reaperATK = new Image();
reaperATK.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/devilATK.svg";

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
                break;
            case "w":
                this.name = "Werewolf";
                this.currentHP = 150;
                this.maxHP = 150;
                this.monsterIMG = werewolfIMG;
                this.monsterATK = werewolfATK;
                this.dmg = 20;
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

    randomDrop() {
        const itemDrop = rng(100);
        switch(this.name){
            case "Octopus":
                if(itemDrop > 70){
                    return "HP";
                } else {
                    return "G";
                }
            case "Werewolf":
                if(itemDrop > 60){
                    return "HP";
                // } else if(itemDrop > 80){
                //     return "MP";
                } else {
                    return "G";
                }
            case "Vampire":
                if (itemDrop > 90) {
                    return "INVULN";
                } else if (itemDrop > 70) {
                    return "ATK";
                } else if(itemDrop > 50){
                    return "DEF";
                } else if(itemDrop > 25){
                    return "HP";
                // } else if(itemDrop > 40){
                //     return "MP"
                } else {
                    return "G"
                }
            case "Reaper":
                if(itemDrop > 40){
                    return "DEATH";
                } else if(itemDrop > 20){
                    return "INVULN";
                } else {
                    return "HP";
                }
            case "Unknown":
                return "G";
        }
    }
}
