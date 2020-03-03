import { cD, renderChar, startX, startY } from "./char";
import createMonster from "./monster";

var goldBar = new Image();
goldBar.src = "https://image.flaticon.com/icons/svg/362/362944.svg";

var wall = new Image();
wall.src = "https://image.flaticon.com/icons/svg/351/351764.svg";

var healthPotion = new Image();
healthPotion.src = "https://image.flaticon.com/icons/svg/506/506927.svg";

var manaPotion = new Image();
manaPotion.src = "https://image.flaticon.com/icons/svg/1006/1006951.svg";

var sword = new Image();
sword.src = "https://image.flaticon.com/icons/svg/361/361806.svg";

var monster = new Image();
monster.src = "https://image.flaticon.com/icons/svg/2332/2332563.svg";
// wC can have
// "w" = Wall
// "C" = Character (Player)
// "G" = Gold Bars
// "HP" = Health Potion
// "MP" = Mana Potion
// "M" = Monster

// width and height of dungeons
export const maxWidth = 19;
export const maxHeight = 11;
// Inventory Coords
const invXCoord = maxWidth * cD + 22;
const invYCoord = 90;
const invWidth = 5;
const invHeight = 5;
let showInvCursor = false;
let invCursorX = maxWidth * cD + 22;
let invCursorY = 90;
let invCursorPos = 0;

// Char Pos
const char = [startX, startY];
// HP Bar
const hpXCoord = maxWidth * cD + 22;
const hpYCoord = 45;
const hpHeight = 15
// Initializing the wall
let wC = []; // wall constraints (and everything in between)
for(let i = 0; i < maxWidth; i++){
    wC[i] = [];
    if(i === 0 || i === maxWidth-1){
        wC[i] = "w ".repeat(maxHeight).split(" ").slice(0, -1)
        continue;
    }
    for(let j = 0; j < maxHeight; j++){
        if(j === 0 || j === maxHeight-1){
            wC[i].push("w");
        } else {wC[i].push(" ")}
    }
}
// Place character in starting position
wC[char[0]][char[1]] = "C";
// Place gold all over
wC[6][6] = "G";
wC[9][9] = "G";
// Some Health Potions
wC[1][1] = "HP";
wC[1][2] = "HP";
wC[1][3] = "HP";
wC[1][4] = "MP";
wC[2][1] = "HP";
wC[2][2] = "HP";
wC[2][3] = "HP";
wC[2][4] = "MP";
wC[3][3] = "M";
let monsters = {}
monsters[3] = {};
monsters[3][3] = createMonster(100);

let goldCount = 0;
let inventory = [];
let currentHP = 5;
let maxHP = 100;
let currentMP = 50;
let maxMP = 100;
let showAttack = false;
let attackBlock = [null,null];

const canvas = document.getElementById("gameCanvas");
const gameCanvas = canvas.getContext("2d");

export const moveChar = (dx, dy) => {
    const newPos = wC[char[0] + dx][char[1] + dy];
    switch(newPos){   
        case "G": // Collect Gold
            // console.log("You got gold");
            goldCount += 100;
            break;
        case "HP": // Collect Health Potion
            // console.log("You got Health Potion");
            inventory.push("HP");
            break;
        case "MP": // Collect Health Potion
            // console.log("You got Mana Potion");
            inventory.push("MP");
            break;
        default:
            break;
    }
    
    // Prevents player from running into wall
    if(newPos !== "w" && newPos !== "M"){ //if new pos is not a wall. this was already done in index but this is double checking
        wC[char[0]][char[1]] = " ";
        char[0] += dx;
        char[1] += dy;
        wC[char[0]][char[1]] = "C";
        // TODO: Move Monsters Here
    } else {return char;} 
    // Drawing Walls, Gold, etc.
    gameCanvas.beginPath();
    gameCanvas.clearRect(0,0,maxWidth*cD, maxHeight*cD);
    for (let i = 0; i < maxWidth; i++) {
        for (let j = 0; j < maxHeight; j++) {
            switch(wC[i][j]){
                case "w":
                    gameCanvas.drawImage(wall, i * cD, j * cD, cD, cD);
                    break;
                case "G":
                    gameCanvas.drawImage(goldBar, i * cD, j * cD, cD, cD);
                    break;
                case "HP":
                    gameCanvas.drawImage(healthPotion, i*cD, j*cD, cD, cD);
                    break;
                case "MP":
                    gameCanvas.drawImage(manaPotion, i*cD, j*cD, cD, cD);
                    break;
                case "M":
                    gameCanvas.drawImage(monster, i*cD, j*cD, cD, cD);
                    break;
                default:
                    break;
            }
        }
    }
    gameCanvas.closePath();
    if(showAttack === true){
        gameCanvas.beginPath();
        gameCanvas.globalAlpha = 0.8;
        gameCanvas.drawImage(sword, attackBlock[0]*cD, attackBlock[1]*cD, cD, cD)
        gameCanvas.globalAlpha = 1;
        gameCanvas.closePath();
    }
    // Inventory UI
    gameCanvas.beginPath();
    gameCanvas.rect(maxWidth * cD, 0, 300, (maxHeight*cD));
    gameCanvas.fillStyle = "#666666"
    gameCanvas.fill();
    gameCanvas.rect(invXCoord, invYCoord, cD*invWidth, (invHeight * cD))
    gameCanvas.strokeStyle = "#FFF";
    gameCanvas.stroke();
    for(let i = 0; i < inventory.length;i++){
        switch(inventory[i]){
            case "HP":
                gameCanvas.drawImage(healthPotion, (i%invWidth)*cD + invXCoord, Math.floor(i/invWidth)*50 + invYCoord, cD, cD)
                break;
            case "MP":
                gameCanvas.drawImage(manaPotion, (i%invWidth)*cD + invXCoord, Math.floor(i/invWidth)*50 + invYCoord, cD, cD)
                break;
            default:
                break;
        }
    }
    gameCanvas.closePath();
    // HP Bar
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord, 250, hpHeight);
    gameCanvas.fillStyle = "#FFF";
    gameCanvas.fill();
    gameCanvas.closePath();
    // Current HP
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord, (250 * currentHP/maxHP), hpHeight);
    gameCanvas.fillStyle = "#F00";
    gameCanvas.fill();
    gameCanvas.closePath();
    // MP Bar
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord+hpHeight, 250, hpHeight);
    gameCanvas.fillStyle = "#FFF";
    gameCanvas.fill();
    gameCanvas.closePath();
    // Current MP
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord+hpHeight, (250 * currentMP/maxMP), hpHeight);
    gameCanvas.fillStyle = "#00F";
    gameCanvas.fill();
    gameCanvas.closePath();
    // Inventory Cursor
    if (showInvCursor) {
        gameCanvas.beginPath();
        gameCanvas.rect(invCursorX, invCursorY, cD, cD);
        gameCanvas.strokeStyle = "#FFF";
        gameCanvas.stroke();
        gameCanvas.closePath();
    }

    // Gold Counter
    gameCanvas.beginPath();
    gameCanvas.font = "25px Robot, sans serif";
    gameCanvas.fillStyle = "#ffd700"
    gameCanvas.fillText(`Gold :${goldCount}`, maxWidth * 50 + 10, 30, 225);
    // render character in new position
    renderChar(char[0], char[1])
    return char;
}

export const toggleInvCursor = bool => {
    showInvCursor = bool;
    moveChar(0,0);
}

export const moveInvCursor = (dx, dy) => {
    const newCursorX = invCursorX + dx * cD;
    const newCursorY = invCursorY + dy * cD;
    if(newCursorX >= invXCoord && newCursorX < invXCoord + (invWidth * cD)){
        invCursorX = newCursorX;
        invCursorPos += dx
    }
    if (newCursorY >= invYCoord && newCursorY < invYCoord +(invHeight * cD)) {
        invCursorY = newCursorY;
        invCursorPos += (dy*5)
    }
    moveChar(0,0);
}

export const useItem = () => {
    if (inventory.length < invCursorPos + 1) {
        gameCanvas.beginPath();
        gameCanvas.font = "10px Robot, sans serif";
        gameCanvas.fillStyle = "red";
        gameCanvas.fillText("Empty Slot", char[0] * cD, char[1] * cD);
        gameCanvas.closePath();
    } else {
        // Use Item
        switch (inventory[invCursorPos]) {
            case "HP":
                currentHP += 25;
                break;
            case "MP":
                // Mana
                currentMP += 50;
                break;
            default:
                break;
        }
        if (currentHP > maxHP) {
            currentHP = maxHP;
        }
        inventory = inventory.slice(0, invCursorPos).concat(inventory.slice(invCursorPos + 1, inventory.length));
        moveChar(0,0);
    }
}

export const toggleAttack = (bool=false) =>{
    showAttack = bool || !showAttack;
    attackBlock[0] = char[0];
    attackBlock[1] = char[1]+1;
    moveChar(0, 0);
}

export const attackDir = (dx, dy) => {
    attackBlock[0] = char[0] + dx;
    attackBlock[1] = char[1] + dy;
    moveChar(0,0);
}

export const attack = () =>{
    try{
        const targetMonster = monsters[attackBlock[0]][attackBlock[1]];
        targetMonster.currentHP -= 100;
        if (targetMonster.currentHP <= 0) {
            wC[attackBlock[0]][attackBlock[1]] = "G";
        }
        toggleAttack();
    } catch (err) {
        // console.log(err);
        toggleAttack();
        gameCanvas.beginPath();
        gameCanvas.font = "8px Robot, sans serif";
        gameCanvas.fillStyle = "red";
        gameCanvas.fillText("Invalid Target", char[0]*cD, char[1]*cD);
        gameCanvas.closePath();
    }
    
}