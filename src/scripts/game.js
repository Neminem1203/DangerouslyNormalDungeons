import { cD, renderChar, startX, startY } from "./char";
import { Monster} from "./monster";


const rng = (num) => Math.floor(Math.random() * num);

var goldBar = new Image();
goldBar.src = "https://image.flaticon.com/icons/svg/362/362944.svg";

var wall = new Image();
wall.src = "https://image.flaticon.com/icons/svg/351/351764.svg";

export var floorTile = new Image();
// floorTile.src = "https://image.flaticon.com/icons/svg/1192/1192637.svg"; // COLORED
// floorTile.src = "https://image.flaticon.com/icons/svg/1193/1193200.svg"; // BLACK ON WHITE
// floorTile.src = "https://image.flaticon.com/icons/svg/1192/1192587.svg"; // WHITE ON BLACK
export const floorBGColor = "#999";

var healthPotion = new Image();
healthPotion.src = "https://image.flaticon.com/icons/svg/506/506927.svg";

var manaPotion = new Image();
manaPotion.src = "https://image.flaticon.com/icons/svg/1006/1006951.svg";

var sword = new Image();
sword.src = "https://image.flaticon.com/icons/svg/361/361806.svg";

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
        wC[i] = []
        for(let j = 0; j <= maxHeight; j++){
            wC[i].push("w");
        }
        continue;
    }
    for(let j = 0; j < maxHeight; j++){
        if(j === 0 || j === maxHeight-1){
            wC[i].push("w");
        } else {
            wC[i].push([])
        }
    }
}
window.wC = wC
// Place character in starting position
wC[char[0]][char[1]] = ["C"];
// Some Health Potions
wC[9][4].push("HP");
wC[9][4].push("HP");
wC[9][4].push("HP");
wC[9][4].push("MP");
wC[9][4].push("HP");
wC[9][4].push("HP");
wC[9][4].push("HP");
wC[9][4].push("MP");
let monsters = {};
for(let i = 1; i < maxWidth-1; i++){
    monsters[i] = {};
}
window.monsters = monsters;
monsters[3][3] = new Monster("o", 3, 3);
monsters[3][4] = new Monster("o", 3, 4);
monsters[5][7] = new Monster("o", 5, 7);

let goldCount = 0;
let inventory = [];
let currentHP = 10;
let maxHP = 100;
let currentMP = 50;
let maxMP = 100;
let showAttack = false;
let monstersMove = false;
let gameOver = false;
let attackBlock = [null,null];

const canvas = document.getElementById("gameCanvas");
const gameCanvas = canvas.getContext("2d");

export const moveChar = (dx, dy) => {
    if (char[0] === -1000){return null;}
    const newPos = wC[char[0] + dx][char[1] + dy];
    let walled = false;
    let newGold = goldCount;
    let newInv = inventory.slice();
    for(let i = 0; i < newPos.length; i++){
        switch (newPos[i]) {
            case "G": // Collect Gold
                newGold += 1;
                break;
            case "HP": // Collect Health Potion
                newInv.push("HP");
                break;
            case "MP": // Collect Health Potion
                newInv.push("MP");
                break;
            case "w":
                walled = true;
                break;
            default:
                break;
        }
    }
    let monsterBlock = false;
    // monsters = Array
    // for(let i = 0; i < monsters.length; i++){
    //     if (monsters[i].x === char[0]+dx && monsters[i].y === char[1]+dy) {
    //         monsterBlock = true;
    //     }
    // }
    // monsters = Object
    Object.values(monsters).forEach(row => {
        Object.values(row).forEach(monster => {
            if (monster.x === char[0] + dx && monster.y === char[1] + dy) {
                monsterBlock = true;
            }
        })
    })
    // Prevents player from running into wall
    if(!walled && !monsterBlock){ //if new pos is not a wall. this was already done in index but this is double checking
        goldCount = newGold;
        inventory = newInv;
        wC[char[0]][char[1]] = [];
        char[0] += dx;
        char[1] += dy;
        wC[char[0]][char[1]] = ["C"];
        if (dx + dy !== 0 || monstersMove) {
            monstersMove = false;
            Object.values(monsters).forEach(row => {
                Object.values(row).forEach(monster => {
                    if (monster.moved) { return; }
                    const monsterTurn = monster.takeTurn(char[0], char[1]);
                    if (monsterTurn) {
                        if (wC[monster.attackX][monster.attackY][0] === "C") {
                            currentHP -= 10;
                        }
                        monster.attackX = null;
                        monster.attackY = null;
                    } else if (monsterTurn === false) {
                        // Difference between char and monster
                        const dxMon = char[0] - monster.x;
                        const dyMon = char[1] - monster.y;
                        // Step towards the player
                        const dxMonNorm = Math.abs(dxMon) / dxMon || 0;
                        const dyMonNorm = Math.abs(dyMon) / dyMon || 0;
                        // New Pos if they move
                        const newMonX = monster.x + dxMonNorm;
                        const newMonY = monster.y + dyMonNorm;
                        // can move in that direction
                        let canMoveX = true;
                        let canMoveY = true;

                        if (monsters[monster.x][newMonY] !== undefined) {
                            canMoveY = false;
                        }
                        if (monsters[newMonX][monster.y] !== undefined) {
                            canMoveX = false;
                        }
                        debugger
                        const tempMon = monster;
                        delete monsters[monster.x][monster.y]
                        if (Math.abs(dxMon) > Math.abs(dyMon) && canMoveX) {
                            tempMon.x = newMonX;
                        } else if (canMoveY) {
                            tempMon.y = newMonY;
                        }
                        tempMon.moved = true;
                        monsters[tempMon.x][tempMon.y] = tempMon;
                    }
                })
            })
        }
        Object.values(monsters).forEach(row => {
            Object.values(row).forEach(monster => {
                monster.moved = false;
            })
        })
        if (currentHP <= 0) {
            currentHP = 0;
            wC[char[0]][char[1]] = [];
            char[0] = -1000
            char[1] = -1000
            gameOver = true;
        }
    } else {return char;} 
    // Drawing Walls, Gold, etc.
    gameCanvas.beginPath();
    if(showInvCursor || gameOver){
        gameCanvas.globalAlpha = 0.5;
    }
    gameCanvas.clearRect(0,0,maxWidth*cD, maxHeight*cD);
    for(let i = 0; i < maxWidth; i++){
        for(let j = 0; j < maxHeight; j++){
            //Dungeon Floor
            gameCanvas.rect(i * cD, j * cD, cD, cD);
            gameCanvas.fillStyle = floorBGColor;
            gameCanvas.fill();
            gameCanvas.drawImage(floorTile, i * cD, j * cD, cD, cD);
        }
    }
    gameCanvas.closePath();
    gameCanvas.beginPath();
    for (let i = 0; i < maxWidth; i++) {
        for (let j = 0; j < maxHeight; j++) {
            let renderGold = false;
            let renderHP = false;
            let renderMP = false;
            let renderWall = false;
            for(let k = 0; k < wC[i][j].length; k++){
                switch (wC[i][j][k]) {
                    case "C":
                        // render character in new position
                        renderChar(char[0], char[1]);
                        break;
                    case "w":
                        // gameCanvas.drawImage(wall, i * cD, j * cD, cD, cD);
                        renderWall = true;
                        break;
                    case "G":
                        // gameCanvas.drawImage(goldBar, i * cD, j * cD, cD, cD);
                        renderGold = true;
                        break;
                    case "HP":
                        // gameCanvas.drawImage(healthPotion, i * cD, j * cD, cD, cD);
                        renderHP = true;
                        break;
                    case "MP":
                        // gameCanvas.drawImage(manaPotion, i * cD, j * cD, cD, cD);
                        renderMP = true;
                        break;
                    default:
                        break;
                }
            }
            if (renderGold) { gameCanvas.drawImage(goldBar, i * cD, j * cD, cD, cD); }
            if (renderHP) { gameCanvas.drawImage(healthPotion, i * cD, j * cD, cD, cD); }
            if (renderMP) { gameCanvas.drawImage(manaPotion, i * cD, j * cD, cD, cD); }
            if (renderWall) { gameCanvas.drawImage(wall, i * cD, j * cD, cD, cD);}
        }
    }
    Object.values(monsters).forEach(row => {
        Object.values(row).forEach(monster => {
        // const monster = monsters[i][j];
            gameCanvas.drawImage(monster.monsterIMG, monster.x * cD, monster.y * cD, cD, cD);
            if (monster.currentHP < monster.maxHP) {
                gameCanvas.fillStyle = "#FFF";
                gameCanvas.rect(monster.x*cD, monster.y*cD, cD, 10);
                gameCanvas.fill();
                gameCanvas.closePath();
                gameCanvas.beginPath();
                gameCanvas.fillStyle = "#F00";
                gameCanvas.rect(monster.x * cD, monster.y * cD, cD * (monster.currentHP / monster.maxHP), 10);
                gameCanvas.fill();
                gameCanvas.closePath();
                gameCanvas.beginPath();
            }
            // if monster is attacking, show direction
            if (monster.attackX !== null) {
                gameCanvas.globalAlpha = 0.5;
                gameCanvas.drawImage(monster.monsterATK, monster.attackX * cD, monster.attackY * cD, cD, cD);
                gameCanvas.globalAlpha = 1;

            }
        })
    })
    gameCanvas.closePath();
    if(showAttack === true){
        gameCanvas.beginPath();
        gameCanvas.globalAlpha = 0.8;
        gameCanvas.drawImage(sword, attackBlock[0]*cD, attackBlock[1]*cD, cD, cD)
        gameCanvas.globalAlpha = 1;
        gameCanvas.closePath();
    }

    if (showInvCursor || gameOver) {
        gameCanvas.globalAlpha = 1;
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
                gameCanvas.drawImage(healthPotion, (i%invWidth)*cD + invXCoord, Math.floor(i/invWidth)*cD + invYCoord, cD, cD)
                break;
            case "MP":
                gameCanvas.drawImage(manaPotion, (i%invWidth)*cD + invXCoord, Math.floor(i/invWidth)*cD + invYCoord, cD, cD)
                break;
            default:
                break;
        }
    }
    gameCanvas.closePath();
    // HP Bar
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord, cD*5, hpHeight);
    gameCanvas.fillStyle = "#FFF";
    gameCanvas.fill();
    gameCanvas.closePath();
    // Current HP
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord, (cD*5 * currentHP/maxHP), hpHeight);
    gameCanvas.fillStyle = "#F00";
    gameCanvas.fill();
    gameCanvas.closePath();
    // MP Bar
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord+hpHeight, cD*5, hpHeight);
    gameCanvas.fillStyle = "#FFF";
    gameCanvas.fill();
    gameCanvas.closePath();
    // Current MP
    gameCanvas.beginPath();
    gameCanvas.rect(hpXCoord, hpYCoord+hpHeight, (cD*5 * currentMP/maxMP), hpHeight);
    gameCanvas.fillStyle = "#00F";
    gameCanvas.fill();
    gameCanvas.closePath();
    // Inventory Cursor
    if (showInvCursor) {
        gameCanvas.beginPath();
        gameCanvas.font = `${cD}px Robot, sans serif`;
        gameCanvas.fillStyle = "#000";
        gameCanvas.fillText("INVENTORY", (maxWidth * cD / 2)-cD*4, maxHeight * cD / 2);
        gameCanvas.rect(invCursorX, invCursorY, cD, cD);
        gameCanvas.strokeStyle = "#FFF";
        gameCanvas.stroke();
        gameCanvas.closePath();
    }

    // Gold Counter
    gameCanvas.beginPath();
    gameCanvas.drawImage(goldBar, maxWidth*cD+20, 0, cD, cD);
    gameCanvas.font = "15px Robot, sans serif";
    gameCanvas.fillStyle = "#ffd700"
    gameCanvas.fillText(`x ${goldCount}`, maxWidth * 50 + 80, 30, 225);
    gameCanvas.closePath();
    if(gameOver){ // If player died
        gameCanvas.beginPath();
        gameCanvas.font = `${cD}px Robot, sans serif`;
        gameCanvas.fillStyle = "#ff0000";
        gameCanvas.fillText("GAME OVER", (maxWidth * cD / 2) - cD * 4, maxHeight * cD / 2 + 25);
        gameCanvas.closePath();
    }
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

export const attack = () => {
    monstersMove = true;
    try{
        const newHP = monsters[attackBlock[0]][attackBlock[1]].takeDmg(50);
        if (newHP <= 0) {
            delete monsters[attackBlock[0]][attackBlock[1]];
            const randomNum = rng(100);
            // if (randomNum > 95) {
            //     wC[attackBlock[0]][attackBlock[1]] = "MP";
            // } // TODO:    Put this back in once MP is useful 
            if (randomNum > 85) {
                wC[attackBlock[0]][attackBlock[1]].push("HP");
            } else {
                wC[attackBlock[0]][attackBlock[1]].push("G");
            }
        }
        toggleAttack();
    } catch (err) {
        console.log(err);
        toggleAttack();
        gameCanvas.beginPath();
        gameCanvas.font = "8px Robot, sans serif";
        gameCanvas.fillStyle = "red";
        gameCanvas.fillText("Waited a turn", char[0]*cD, char[1]*cD);
        gameCanvas.closePath();
    }
    
}