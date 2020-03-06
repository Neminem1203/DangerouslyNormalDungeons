import { cD, renderChar, startX, startY } from "./char";
import { Monster} from "./monster";

// Random Number Generator
const rng = (num) => Math.floor(Math.random() * num)+1;
//Images
var goldBar = new Image();
goldBar.src = "https://image.flaticon.com/icons/svg/362/362944.svg";

var wall = new Image();
wall.src = "https://image.flaticon.com/icons/svg/351/351764.svg";

var door = new Image();
door.src = "https://www.flaticon.com/premium-icon/icons/svg/2401/2401054.svg";

export const floorBGColor = "#999";

var healthPotion = new Image();
healthPotion.src = "https://image.flaticon.com/icons/svg/506/506927.svg";

var manaPotion = new Image();
manaPotion.src = "https://image.flaticon.com/icons/svg/1006/1006951.svg";

var sword = new Image();
sword.src = "https://image.flaticon.com/icons/svg/361/361806.svg";
// width and height of dungeons
export const maxWidth = 19;
export const maxHeight = 11;
// Inventory Coords
const invXCoord = maxWidth * cD + 22;
const invYCoord = 90;
const invWidth = 5;
const invHeight = 5;
// Inventory Cursor
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
// TODO: Implement rooms object when ready
// let rooms = {}; // 9 * 9 room. player starts in [5][5]
// for(let i = 0; i < 10; i++){
//      rooms[i] = {};
// }
// let currentRoom = [5,5];
// Items in the room
let items = {};
let monsters = {};

const newRoom = () => { // Generate a new room
    monsters = {};
    items = {
        "G":[],
        "HP":[],
        "MP":[]
    };
    for (let i = 1; i < maxWidth-1; i++) {
        monsters[i] = {};
    }
    // Monster generator
    // let monsterNum = Math.floor((rng(100)-(100-monsterLimit*10)+9)/10);
    let monsterNum = Math.floor(Math.log(rng(34)-10));
    for(let i = 0; i < monsterNum; i++){
        let x = char[0];
        let y = char[1];
        while(char[0] === x && char[1] === y) {
            x = rng(maxWidth - 2);
            y = rng(maxHeight - 2);
        }
        monsters[x][y] = new Monster("o", x, y)
    }
}
newRoom(); // Generate the room in the beginning of the game
items = { // Initial Room has items for player
    "G": [[1, 1], [1, 2]],
    "HP": [[2, 2], [2, 3]],
    "MP": [],
};
// Some Health Potions
let goldCount = 0;
let inventory = ["HP",  "MP"];
let currentHP = 20;
let maxHP = 100;
let currentMP = 50;
let maxMP = 100;
let showAttack = false; // When you prep an attack, it'll show your attack range
let attackBlock = [null,null]; // the attack coords of your character
let monstersMove = false; // Tells you when the monsters should move
let gameOver = false; 
let showControls = false;
// TODO: might have to change to dx, dy in the future when implementing different weapons 
// Drawing Board
const canvas = document.getElementById("gameCanvas"); // The actual canvas element
const gameCanvas = canvas.getContext("2d"); // The paintbrush to draw everything required for this game
export const togglePause = () =>{
    showControls = !showControls;
    moveChar(0,0);
}
// This is used to move the character. moveChar(0,0) is usually used to re-render the game
export const moveChar = (dx, dy) => {
    window.items = items;
    if (char[0] < 0){return;} // The character has died
    // Check to see if character is out of bounds
    if(char[0] + dx === 0 || char[0] + dx === maxWidth-1){
        if (char[1] !== (maxHeight - 1) / 2) {return;}
    }
    if(char[1] + dy === 0 || char[1] + dy === maxHeight-1){
        if (char[0] !== (maxWidth - 1) / 2)  {return;}
    }
    // Check to see if monster is blocking the characters movement
    let monsterBlock = false; 
    Object.values(monsters).forEach(row => {
        Object.values(row).forEach(monster => {
            if (monster.x === char[0] + dx && monster.y === char[1] + dy) {
                monsterBlock = true; // Character is blocked from moving here
            }
        })
    })
    // If not blocked by monster, continue the action
    if(!monsterBlock && !showControls){
        char[0] += dx;
        char[1] += dy;
        let movedRoom = false;
        // Check to see if the player went through a door
        // TODO: Make sure to only render doors that are valid (right now it's infinite dungeon)
        if(char[1] === (maxHeight-1)/2){
            if (char[0] === 0) {
                char[0] = maxWidth - 2;
                newRoom();
                movedRoom = true;
            } else if (char[0] === maxWidth-1) {
                char[0] = 1;
                newRoom();
                movedRoom = true;
            }
        } else if(char[0] === (maxWidth-1)/2){
            if(char[1] === 0){
                char[1] = maxHeight-2;
                newRoom();
                movedRoom = true;
            } else if (char[1] === maxHeight-1){
                char[1] = 1;
                newRoom();
                movedRoom = true;
            }
        }
        // if the player moved (but not to another room) and the monsters are allowed to move
        // then the monsters will take their turn
        if ((dx + dy !== 0 || monstersMove) && !movedRoom) {
            monstersMove = false;
            Object.values(monsters).forEach(row => {
                Object.values(row).forEach(monster => {
                    if (monster.moved) { return; } // if the monster already moved this turn,
                    const monsterTurn = monster.takeTurn(char[0], char[1]);
                    if (monsterTurn) { // If this returns true, the monster will be attacking a position
                        if (monster.attackX === char[0] && monster.attackY === char[1]) {
                            // If player is in the attack range, lose health
                            currentHP -= 10;
                        }
                        // Attack has completed. Now set it to null
                        monster.attackX = null;
                        monster.attackY = null;
                    } else if (monsterTurn === false) { // Not close enough to attack the player
                        // Difference between char and monster
                        const dxMon = char[0] - monster.x;
                        const dyMon = char[1] - monster.y;
                        // A step towards the player
                        const dxMonNorm = Math.abs(dxMon) / dxMon || 0;
                        const dyMonNorm = Math.abs(dyMon) / dyMon || 0;
                        // New Pos if they move
                        const newMonX = monster.x + dxMonNorm;
                        const newMonY = monster.y + dyMonNorm;
                        // can move in that direction
                        let canMoveX = true;
                        let canMoveY = true;
                        // Check if monsters are blocking
                        if (monsters[monster.x][newMonY] !== undefined) {
                            canMoveY = false;
                        }
                        if (monsters[newMonX][monster.y] !== undefined) {
                            canMoveX = false;
                        }
                        // Temporarily save the monster, delete the monster from monsters object
                        // Then move the monster and save it in the new coords
                        const tempMon = monster;
                        delete monsters[monster.x][monster.y]
                        if (Math.abs(dxMon) > Math.abs(dyMon)) {
                            if (canMoveY) {
                                tempMon.y = newMonY;
                            } else if(canMoveX){
                                tempMon.x = newMonX;
                            }
                        } else {
                            if (canMoveX) {
                                tempMon.x = newMonX;
                            } else if (canMoveY) {
                                tempMon.y = newMonY;
                            }
                        }
                        tempMon.moved = true;
                        monsters[tempMon.x][tempMon.y] = tempMon;
                    }
                })
            })
        }
        // once all the monsters have moved, we will set it back to false for next turn
        Object.values(monsters).forEach(row => {
            Object.values(row).forEach(monster => {
                monster.moved = false; 
            })
        })
        // If currentHP <= 0, we set gameOver to true so we player can't do anything
        if (currentHP <= 0) {
            currentHP = 0;
            char[0] = -1000;
            char[1] = -1000;
            gameOver = true;
        }
    } else if(showControls){
        gameCanvas.beginPath();
        gameCanvas.fillStyle = "#555";
        gameCanvas.rect(50, 50, (maxWidth-2)*cD, (maxHeight-2)*cD);
        gameCanvas.fill();
        gameCanvas.font = "30px Roboto, sans serif"
        gameCanvas.fillStyle = "#FFF";
        gameCanvas.fillText("Arrow keys = Movement", 60, 100)
        gameCanvas.fillText("Spacebar = Use Item/Start Attack", 60, 160)
        gameCanvas.fillText("Z = Inventory", 60, 220)
        gameCanvas.fillText("Spacebar (After Starting Attack) = Attack/Wait", 60, 280)
        gameCanvas.fillText("Esc = Show/Hide Controls", 60, (maxHeight-2)*cD)
        gameCanvas.closePath()
        return;
    } else {return;} // if character is blocked by the monster, don't move here
    // Drawing Floor, Walls, Items, and Monsters
    gameCanvas.beginPath();
    if(showInvCursor || gameOver){
        gameCanvas.globalAlpha = 0.5;
    }
    gameCanvas.clearRect(0, 0, maxWidth * cD, maxHeight * cD);
    gameCanvas.closePath();
    for(let i = 1; i < maxWidth-1; i++){
        for(let j = 1; j < maxHeight-1; j++){
            //Dungeon Floor
            gameCanvas.beginPath();
            gameCanvas.rect(i * cD, j * cD, cD, cD);
            gameCanvas.fillStyle = floorBGColor;
            gameCanvas.fill();
            gameCanvas.closePath();
        }
    }
    gameCanvas.beginPath();
    // Drawing the walls
    for (let i = 0; i < maxWidth; i++) {
        if (i === 0 || i === maxWidth - 1) {
            for (let j = 0; j <= maxHeight; j++) {
                if (j === (maxHeight - 1) / 2) {
                    gameCanvas.drawImage(door, i*cD, j*cD, cD, cD);
                } else {
                    gameCanvas.drawImage(wall, i * cD, j * cD, cD, cD);
                }
            }
            continue;
        }
        for (let j = 0; j < maxHeight; j++) {
            if (j === 0 || j === maxHeight - 1) {
                if (i === (maxWidth - 1) / 2) {
                    gameCanvas.drawImage(door, i * cD, j * cD, cD, cD);
                } else {
                    gameCanvas.drawImage(wall, i * cD, j * cD, cD, cD);
                }
            }
        }
    }
    // Drawing Items
    Object.keys(items).forEach(itemName =>{
        for(let i = 0; i < items[itemName].length; i++){
            // If character is standing on the item, push it to their inventory
            const x = items[itemName][i][0];
            const y = items[itemName][i][1];
            if ( x === char[0] && y === char[1]){
                
                if(itemName === "G"){goldCount++;}
                else { inventory.push(itemName);}

                items[itemName] = items[itemName].slice(0, i).concat(items[itemName].slice(i + 1, items.length));
                i--;
            } else {
                switch(itemName){
                    case "G":
                        gameCanvas.drawImage(goldBar, x * cD, y * cD, cD, cD);
                        break;
                    case "HP":
                        gameCanvas.drawImage(healthPotion, x * cD, y * cD, cD, cD);
                        break;
                    case "MP":
                        gameCanvas.drawImage(manaPotion, x * cD, y * cD, cD, cD);
                        break;
                    default:
                        console.log(`Unknown Item: ${itemName}`)
                        break;
                }
            }
        }
    })
    // for (let i = 0; i < maxWidth; i++) {
    //     for (let j = 0; j < maxHeight; j++) {
    //         let renderGold = false;
    //         let renderHP = false;
    //         let renderMP = false;
    //         // render Walls.
    //         // iterate through items
    //         // for(let k = 0; k < wC[i][j].length; k++){
    //         //     switch (wC[i][j][k]) {
    //         //         case "w":
    //         //             // gameCanvas.drawImage(wall, i * cD, j * cD, cD, cD);
    //         //             renderWall = true;
    //         //             break;
    //         //         case "d":
    //         //             renderDoor = true;
    //         //             break;
    //         //         case "G":
    //         //             // gameCanvas.drawImage(goldBar, i * cD, j * cD, cD, cD);
    //         //             renderGold = true;
    //         //             break;
    //         //         case "HP":
    //         //             // gameCanvas.drawImage(healthPotion, i * cD, j * cD, cD, cD);
    //         //             renderHP = true;
    //         //             break;
    //         //         case "MP":
    //         //             // gameCanvas.drawImage(manaPotion, i * cD, j * cD, cD, cD);
    //         //             renderMP = true;
    //         //             break;
    //         //         default:
    //         //             break;
    //         //     }
    //         // }
    //         if (renderGold) { gameCanvas.drawImage(goldBar, i * cD, j * cD, cD, cD); }
    //         if (renderHP) { gameCanvas.drawImage(healthPotion, i * cD, j * cD, cD, cD); }
    //         if (renderMP) { gameCanvas.drawImage(manaPotion, i * cD, j * cD, cD, cD); }
    //     }
    // }
    // Render the character
    renderChar(char[0], char[1]);
    // Render Monsters
    Object.values(monsters).forEach(row => {
        Object.values(row).forEach(monster => {
        // const monster = monsters[i][j];
            gameCanvas.drawImage(monster.monsterIMG, monster.x * cD, monster.y * cD, cD, cD);
            // If monsters have less health than max health, render it
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
    if(showAttack === true){ // Show your attack range
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
        gameCanvas.font = `${cD}px Roboto, sans serif`;
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
    gameCanvas.font = "15px Roboto, sans serif";
    gameCanvas.fillStyle = "#ffd700"
    gameCanvas.fillText(`x ${goldCount}`, maxWidth * 50 + 80, 30, 225);
    gameCanvas.closePath();
    if(gameOver){ // If player died
        gameCanvas.beginPath();
        gameCanvas.font = `${cD}px Roboto, sans serif`;
        gameCanvas.fillStyle = "#ff0000";
        gameCanvas.fillText("GAME OVER", (maxWidth * cD / 2) - cD * 4, maxHeight * cD / 2 + 25);
        gameCanvas.closePath();
    }
    return;
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
        gameCanvas.font = "10px Roboto, sans serif";
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
        if (currentMP > maxMP){
            currentMP = maxMP;
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
            if(randomNum > 99){
                items["MP"].push([attackBlock[0], attackBlock[1]]);
            } else if(randomNum > 60){
                items["HP"].push([attackBlock[0], attackBlock[1]]);
            } else {
                items["G"].push([attackBlock[0], attackBlock[1]]);
            }
        }
        toggleAttack();
    } catch (err) {
        console.log(err);
        toggleAttack();
        gameCanvas.beginPath();
        gameCanvas.font = "8px Roboto, sans serif";
        gameCanvas.fillStyle = "red";
        gameCanvas.fillText("Waited a turn", char[0]*cD, char[1]*cD);
        gameCanvas.closePath();
    }
    
}
