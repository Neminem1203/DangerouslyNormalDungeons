/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/char.js":
/*!*****************************!*\
  !*** ./src/scripts/char.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cD: function() { return /* binding */ cD; },
/* harmony export */   renderChar: function() { return /* binding */ renderChar; },
/* harmony export */   startX: function() { return /* binding */ startX; },
/* harmony export */   startY: function() { return /* binding */ startY; }
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");

var playerImg = new Image();
playerImg.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/character.svg";
let cD = 50; // character dimension
// Players starting position
const startX = 9;
const startY = 5;
let x = cD * startX;
let y = cD * startY;
const canvas = document.getElementById("gameCanvas");
const char = canvas.getContext("2d");
function renderChar(newX, newY) {
  char.beginPath();
  char.fillStyle = _game__WEBPACK_IMPORTED_MODULE_0__.floorBGColor;
  // char.rect(x * cD, y * cD, cD, cD);
  // char.rect(newX * cD, newY * cD, cD, cD);
  char.fill();
  char.drawImage(playerImg, newX * cD, newY * cD, cD, cD);
  x = newX;
  y = newY;
  char.closePath();
}

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attack: function() { return /* binding */ attack; },
/* harmony export */   attackDir: function() { return /* binding */ attackDir; },
/* harmony export */   floorBGColor: function() { return /* binding */ floorBGColor; },
/* harmony export */   maxHeight: function() { return /* binding */ maxHeight; },
/* harmony export */   maxWidth: function() { return /* binding */ maxWidth; },
/* harmony export */   moveChar: function() { return /* binding */ moveChar; },
/* harmony export */   moveInvCursor: function() { return /* binding */ moveInvCursor; },
/* harmony export */   restartGame: function() { return /* binding */ restartGame; },
/* harmony export */   toggleAttack: function() { return /* binding */ toggleAttack; },
/* harmony export */   toggleInvCursor: function() { return /* binding */ toggleInvCursor; },
/* harmony export */   togglePause: function() { return /* binding */ togglePause; },
/* harmony export */   useItem: function() { return /* binding */ useItem; }
/* harmony export */ });
/* harmony import */ var _char__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./char */ "./src/scripts/char.js");
/* harmony import */ var _monster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monster */ "./src/scripts/monster.js");



// Random Number Generator
const rng = num => Math.floor(Math.random() * num) + 1;
//Images
var goldBar = new Image();
goldBar.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/goldIngots.svg";
var wall = new Image();
wall.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/Walls.svg";
var door = new Image();
door.src = "";
var lockedDoor = new Image();
lockedDoor.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/doubleDoor.svg";
const floorBGColor = "#999";
var healthPotion = new Image();
healthPotion.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/HealthPotion.svg";
var manaPotion = new Image();
manaPotion.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/ManaPotion.svg";
var atkPotion = new Image();
atkPotion.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/ATKPotion.svg";
var defPotion = new Image();
defPotion.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/defPotion.svg";
var invulnPotion = new Image();
invulnPotion.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/invulnPotion.svg";
var deathPotion = new Image();
deathPotion.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/deathPotion.svg";
var sword = new Image();
sword.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/refs/heads/master/src/svgs/attack.svg";
// width and height of dungeons
const maxWidth = 19;
const maxHeight = 11;
// Inventory Coords
const invXCoord = maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + 22;
const invYCoord = 90;
const invWidth = 5;
const invHeight = 5;
// Inventory Cursor
let showInvCursor = false;
let invCursorX = maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + 22;
let invCursorY = 90;
let invCursorPos = 0;
// Char Pos
let char = [_char__WEBPACK_IMPORTED_MODULE_0__.startX, _char__WEBPACK_IMPORTED_MODULE_0__.startY];
// HP Bar
const hpXCoord = maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + 22;
const hpYCoord = 45;
const hpHeight = 15;
// TODO: Implement rooms object when ready
// let rooms = {}; // 9 * 9 room. player starts in [5][5]
// for(let i = 0; i < 10; i++){
//      rooms[i] = {};
// }
// let currentRoom = [5,5];
// Items in the room
let items = {};
let monsters = {};
const prevRoomFunc = (x, y) => {
  prevRoom[0] = x;
  prevRoom[1] = y;
};
const newRoom = () => {
  // Generate a new room
  monsters = {};
  items = {
    "G": [],
    "HP": [],
    "MP": [],
    "ATK": [],
    "DEF": [],
    "INVULN": [],
    "DEATH": []
  };
  for (let i = 1; i < maxWidth - 1; i++) {
    monsters[i] = {};
  }
  // Monster generator
  // let monsterNum = Math.floor((rng(100)-(100-monsterLimit*10)+9)/10);
  let monsterNum = Math.floor(Math.log(rng(34) - 10));
  for (let i = 0; i < monsterNum; i++) {
    let x = char[0];
    let y = char[1];
    while (char[0] === x && char[1] === y) {
      x = rng(maxWidth - 2);
      y = rng(maxHeight - 2);
    }
    const monsterType = rng(100);
    if (monsterType > 98) {
      monsters[x][y] = new _monster__WEBPACK_IMPORTED_MODULE_1__.Monster("r", x, y);
    } else if (monsterType > 80) {
      monsters[x][y] = new _monster__WEBPACK_IMPORTED_MODULE_1__.Monster("v", x, y);
    } else if (monsterType > 50) {
      monsters[x][y] = new _monster__WEBPACK_IMPORTED_MODULE_1__.Monster("w", x, y);
    } else {
      monsters[x][y] = new _monster__WEBPACK_IMPORTED_MODULE_1__.Monster("o", x, y);
    }
  }
};
const restartGame = () => {
  // Some Health Potions
  char = [_char__WEBPACK_IMPORTED_MODULE_0__.startX, _char__WEBPACK_IMPORTED_MODULE_0__.startY];
  showInvCursor = false;
  goldCount = 0;
  inventory = ["HP", "ATK", "DEF", "INVULN", "DEATH"];
  currentHP = 20;
  maxHP = 100;
  currentMP = 100;
  maxMP = 100;
  userATK = 50;
  userDef = 0;
  //Potion Effects
  atkTurns = 0;
  defTurns = 0;
  invulnTurns = 0;
  prevRoom = [0, 0];
  showAttack = false; // When you prep an attack, it'll show your attack range
  attackBlock = [null, null]; // the attack coords of your character
  monstersMove = false; // Tells you when the monsters should move
  gameOver = false;
  showControls = false;
  newRoom();
  items = {
    // Initial Room has items for player
    "G": [[17, 1], [17, 2]],
    "HP": [[16, 2], [16, 3]],
    "MP": [],
    "ATK": [],
    "DEF": [],
    "INVULN": [],
    "DEATH": []
  };
  moveChar(0, 0);
};
// Some Health Potions
let goldCount = 0;
let inventory = ["HP", "ATK", "DEF", "INVULN", "DEATH"];
let currentHP = 20;
let maxHP = 100;
let currentMP = 100;
let maxMP = 100;
let userATK = 50;
let userDef = 0;
//Potion Effects
let atkTurns = 0;
let defTurns = 0;
let invulnTurns = 0;
let prevRoom = [0, 0];
let showAttack = false; // When you prep an attack, it'll show your attack range
let attackBlock = [null, null]; // the attack coords of your character
let monstersMove = false; // Tells you when the monsters should move
let gameOver = false;
let showControls = false;
// TODO: might have to change to dx, dy in the future when implementing different weapons 
// Drawing Board
const canvas = document.getElementById("gameCanvas"); // The actual canvas element
const gameCanvas = canvas.getContext("2d"); // The paintbrush to draw everything required for this game
const togglePause = () => {
  showControls = !showControls;
  moveChar(0, 0);
};
// This is used to move the character. moveChar(0,0) is usually used to re-render the game
const moveChar = (dx, dy) => {
  window.items = items;
  if (char[0] < 0) {
    return;
  } // The character has died
  // Check to see if character is out of bounds
  if (char[0] + dx === 0 || char[0] + dx === maxWidth - 1) {
    if (char[1] !== (maxHeight - 1) / 2) {
      return;
    }
  }
  if (char[1] + dy === 0 || char[1] + dy === maxHeight - 1) {
    if (char[0] !== (maxWidth - 1) / 2) {
      return;
    }
  }
  // Check to see if monster is blocking the characters movement
  let monsterBlock = false;
  Object.values(monsters).forEach(row => {
    Object.values(row).forEach(monster => {
      if (monster.x === char[0] + dx && monster.y === char[1] + dy) {
        monsterBlock = true; // Character is blocked from moving here
      }
    });
  });
  // If not blocked by monster, continue the action

  if (!monsterBlock && !showControls) {
    char[0] += dx;
    char[1] += dy;
    if (prevRoom[0] == char[0] && prevRoom[1] == char[1]) {
      char[0] -= dx;
      char[1] -= dy;
      return;
    }
    let movedRoom = false;
    // Check to see if the player went through a door
    // TODO: Make sure to only render doors that are valid (right now it's infinite dungeon)
    if (char[1] === (maxHeight - 1) / 2) {
      if (char[0] === 0) {
        char[0] = maxWidth - 2;
        prevRoomFunc(char[0] + 1, char[1]);
        newRoom();
        movedRoom = true;
      } else if (char[0] === maxWidth - 1) {
        char[0] = 1;
        prevRoomFunc(char[0] - 1, char[1]);
        newRoom();
        movedRoom = true;
      }
    } else if (char[0] === (maxWidth - 1) / 2) {
      if (char[1] === 0) {
        char[1] = maxHeight - 2;
        prevRoomFunc(char[0], char[1] + 1);
        newRoom();
        movedRoom = true;
      } else if (char[1] === maxHeight - 1) {
        char[1] = 1;
        prevRoomFunc(char[0], char[1] - 1);
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
          if (monster.moved) {
            return;
          } // if the monster already moved this turn,
          const monsterTurn = monster.takeTurn(char[0], char[1]);
          if (monsterTurn) {
            // If this returns true, the monster will be attacking a position
            if (invulnTurns === 0 && monster.attackX === char[0] && monster.attackY === char[1]) {
              // If player is in the attack range, lose health
              currentHP -= monster.dmg - userDef;
            }
            // Attack has completed. Now set it to null
            monster.attackX = null;
            monster.attackY = null;
          } else if (monsterTurn === false) {
            // Not close enough to attack the player
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
            delete monsters[monster.x][monster.y];
            if (rng(100) < 50) {
              if (canMoveY) {
                tempMon.y = newMonY;
              } else if (canMoveX) {
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
        });
      });
      // Potions wears off over time
      if (invulnTurns > 0) {
        invulnTurns--;
      }
      if (defTurns > 0) {
        defTurns--;
        if (defTurns == 0) {
          userDef = 0;
        }
      }
      if (atkTurns > 0) {
        atkTurns--;
        if (atkTurns == 0) {
          userATK = 50;
        }
      }
    }
    // once all the monsters have moved, we will set it back to false for next turn
    Object.values(monsters).forEach(row => {
      Object.values(row).forEach(monster => {
        monster.moved = false;
      });
    });
    // If currentHP <= 0, we set gameOver to true so we player can't do anything
    if (currentHP <= 0) {
      currentHP = 0;
      char[0] = -1000;
      char[1] = -1000;
      gameOver = true;
    }
  } else if (showControls) {
    gameCanvas.beginPath();
    gameCanvas.globalAlpha = 0.5;
    gameCanvas.fillStyle = "#555";
    gameCanvas.rect(100, 100, (maxWidth - 4) * _char__WEBPACK_IMPORTED_MODULE_0__.cD, (maxHeight - 4) * _char__WEBPACK_IMPORTED_MODULE_0__.cD);
    gameCanvas.fill();
    gameCanvas.font = "25px Roboto, sans serif";
    gameCanvas.fillStyle = "#FFF";
    gameCanvas.fillText("Arrow keys = Movement", 110, 140);
    gameCanvas.fillText("Spacebar = Use Item/Start Attack", 110, 170);
    gameCanvas.fillText("Z = Inventory", 110, 200);
    gameCanvas.fillText("Spacebar (After Starting Attack) = Attack/Wait", 110, 230);
    gameCanvas.fillText("R = Restarts Game", 110, 260);
    gameCanvas.font = "15px Roboto, sans serif";
    gameCanvas.fillText("Waiting occurs when you hit an empty area", 500, 245);
    gameCanvas.font = "30px Roboto, sans serif";
    gameCanvas.fillText("Esc = Show/Hide Controls", 110, 430);
    gameCanvas.globalAlpha = 1;
    gameCanvas.closePath();
    return;
  } else {
    return;
  } // if character is blocked by the monster, don't move here
  // Drawing Floor, Walls, Items, and Monsters
  gameCanvas.beginPath();
  if (showInvCursor || gameOver) {
    gameCanvas.globalAlpha = 0.5;
  }
  gameCanvas.clearRect(0, 0, maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD);
  gameCanvas.closePath();
  for (let i = 1; i < maxWidth - 1; i++) {
    for (let j = 1; j < maxHeight - 1; j++) {
      //Dungeon Floor
      gameCanvas.beginPath();
      gameCanvas.rect(i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
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
          console.log(i, j);
          if (prevRoom[0] === i && prevRoom[1] === j) {
            gameCanvas.drawImage(lockedDoor, i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
          } else {
            gameCanvas.drawImage(door, i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
          }
        } else {
          gameCanvas.drawImage(wall, i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        }
      }
      continue;
    }
    for (let j = 0; j < maxHeight; j++) {
      if (j === 0 || j === maxHeight - 1) {
        if (i === (maxWidth - 1) / 2) {
          console.log(i, j);
          if (prevRoom[0] === i && prevRoom[1] === j) {
            gameCanvas.drawImage(lockedDoor, i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
          } else {
            gameCanvas.drawImage(door, i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
          }
        } else {
          gameCanvas.drawImage(wall, i * _char__WEBPACK_IMPORTED_MODULE_0__.cD, j * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        }
      }
    }
  }
  // Drawing Items
  Object.keys(items).forEach(itemName => {
    for (let i = 0; i < items[itemName].length; i++) {
      // If character is standing on the item, push it to their inventory
      const x = items[itemName][i][0];
      const y = items[itemName][i][1];
      if (x === char[0] && y === char[1]) {
        if (itemName === "G") {
          goldCount++;
        } else {
          inventory.push(itemName);
        }
        items[itemName] = items[itemName].slice(0, i).concat(items[itemName].slice(i + 1, items.length));
        i--;
      } else {
        switch (itemName) {
          case "G":
            gameCanvas.drawImage(goldBar, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          case "HP":
            gameCanvas.drawImage(healthPotion, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          case "MP":
            gameCanvas.drawImage(manaPotion, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          case "ATK":
            gameCanvas.drawImage(atkPotion, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          case "DEF":
            gameCanvas.drawImage(defPotion, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          case "INVULN":
            gameCanvas.drawImage(invulnPotion, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          case "DEATH":
            gameCanvas.drawImage(deathPotion, x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
            break;
          default:
            console.log(`Unknown Item: ${itemName}`);
            break;
        }
      }
    }
  });
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
  // If they're invuln, make them 0.1 to indicate invulnerability
  if (invulnTurns > 0) {
    gameCanvas.globalAlpha = 0.1;
  }
  (0,_char__WEBPACK_IMPORTED_MODULE_0__.renderChar)(char[0], char[1]);
  if (invulnTurns > 0) {
    gameCanvas.globalAlpha = 1;
  }
  // Render Monsters
  Object.values(monsters).forEach(row => {
    Object.values(row).forEach(monster => {
      // const monster = monsters[i][j];
      gameCanvas.drawImage(monster.monsterIMG, monster.x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, monster.y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
      // If monsters have less health than max health, render it
      if (monster.currentHP < monster.maxHP) {
        gameCanvas.fillStyle = "#FFF";
        gameCanvas.rect(monster.x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, monster.y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, 10);
        gameCanvas.fill();
        gameCanvas.closePath();
        gameCanvas.beginPath();
        gameCanvas.fillStyle = "#F00";
        gameCanvas.rect(monster.x * _char__WEBPACK_IMPORTED_MODULE_0__.cD, monster.y * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD * (monster.currentHP / monster.maxHP), 10);
        gameCanvas.fill();
        gameCanvas.closePath();
        gameCanvas.beginPath();
      }
      // if monster is attacking, show direction
      if (monster.attackX !== null) {
        gameCanvas.globalAlpha = 0.5;
        gameCanvas.drawImage(monster.monsterATK, monster.attackX * _char__WEBPACK_IMPORTED_MODULE_0__.cD, monster.attackY * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        gameCanvas.globalAlpha = 1;
      }
    });
  });
  gameCanvas.closePath();
  if (showAttack === true) {
    // Show your attack range
    gameCanvas.beginPath();
    gameCanvas.globalAlpha = 0.7;
    gameCanvas.drawImage(sword, attackBlock[0] * _char__WEBPACK_IMPORTED_MODULE_0__.cD, attackBlock[1] * _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
    gameCanvas.globalAlpha = 1;
    gameCanvas.closePath();
  }
  if (showInvCursor || gameOver) {
    gameCanvas.globalAlpha = 1;
  }
  // Inventory UI
  gameCanvas.beginPath();
  gameCanvas.rect(maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD, 0, 300, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD);
  gameCanvas.fillStyle = "#666666";
  gameCanvas.fill();
  gameCanvas.rect(invXCoord, invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD * invWidth, invHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD);
  gameCanvas.strokeStyle = "#FFF";
  gameCanvas.stroke();
  for (let i = 0; i < inventory.length; i++) {
    switch (inventory[i]) {
      case "HP":
        gameCanvas.drawImage(healthPotion, i % invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invXCoord, Math.floor(i / invWidth) * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        break;
      case "MP":
        gameCanvas.drawImage(manaPotion, i % invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invXCoord, Math.floor(i / invWidth) * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        break;
      case "ATK":
        gameCanvas.drawImage(atkPotion, i % invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invXCoord, Math.floor(i / invWidth) * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        break;
      case "DEF":
        gameCanvas.drawImage(defPotion, i % invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invXCoord, Math.floor(i / invWidth) * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        break;
      case "INVULN":
        gameCanvas.drawImage(invulnPotion, i % invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invXCoord, Math.floor(i / invWidth) * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        break;
      case "DEATH":
        gameCanvas.drawImage(deathPotion, i % invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invXCoord, Math.floor(i / invWidth) * _char__WEBPACK_IMPORTED_MODULE_0__.cD + invYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
        break;
      default:
        break;
    }
  }
  gameCanvas.closePath();
  // HP Bar
  gameCanvas.beginPath();
  gameCanvas.rect(hpXCoord, hpYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD * 5, hpHeight);
  gameCanvas.fillStyle = "#FFF";
  gameCanvas.fill();
  gameCanvas.closePath();
  // Current HP
  gameCanvas.beginPath();
  gameCanvas.rect(hpXCoord, hpYCoord, _char__WEBPACK_IMPORTED_MODULE_0__.cD * 5 * currentHP / maxHP, hpHeight);
  gameCanvas.fillStyle = "#F00";
  gameCanvas.fill();
  gameCanvas.closePath();
  // MP Bar
  gameCanvas.beginPath();
  gameCanvas.rect(hpXCoord, hpYCoord + hpHeight, _char__WEBPACK_IMPORTED_MODULE_0__.cD * 5, hpHeight);
  gameCanvas.fillStyle = "#FFF";
  gameCanvas.fill();
  gameCanvas.closePath();
  // Current MP
  gameCanvas.beginPath();
  gameCanvas.rect(hpXCoord, hpYCoord + hpHeight, _char__WEBPACK_IMPORTED_MODULE_0__.cD * 5 * currentMP / maxMP, hpHeight);
  gameCanvas.fillStyle = "#00F";
  gameCanvas.fill();
  gameCanvas.closePath();
  // Inventory Cursor
  if (showInvCursor) {
    gameCanvas.beginPath();
    gameCanvas.font = `${_char__WEBPACK_IMPORTED_MODULE_0__.cD}px Roboto, sans serif`;
    gameCanvas.fillStyle = "#000";
    gameCanvas.fillText("INVENTORY", maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD / 2 - _char__WEBPACK_IMPORTED_MODULE_0__.cD * 4, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD / 2);
    gameCanvas.rect(invCursorX, invCursorY, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
    gameCanvas.strokeStyle = "#FFF";
    gameCanvas.stroke();
    gameCanvas.closePath();
  }
  // Potion Status
  gameCanvas.beginPath();
  gameCanvas.font = `${_char__WEBPACK_IMPORTED_MODULE_0__.cD / 2}px Roboto, sans serif`;
  gameCanvas.fillStyle = "#FFF";
  if (defTurns > 0) {
    gameCanvas.fillText(`DEF UP: ${defTurns}`, maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + 50, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD - 150);
  }
  if (atkTurns > 0) {
    gameCanvas.fillText(`ATK UP: ${atkTurns}`, maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + 50, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD - 100);
  }
  gameCanvas.closePath();
  // Gold Counter
  gameCanvas.beginPath();
  gameCanvas.drawImage(goldBar, maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD + 20, 0, _char__WEBPACK_IMPORTED_MODULE_0__.cD, _char__WEBPACK_IMPORTED_MODULE_0__.cD);
  gameCanvas.font = "15px Roboto, sans serif";
  gameCanvas.fillStyle = "#ffd700";
  gameCanvas.fillText(`x ${goldCount}`, maxWidth * 50 + 80, 30, 225);
  gameCanvas.closePath();
  if (gameOver) {
    // If player died
    gameCanvas.beginPath();
    gameCanvas.font = `${_char__WEBPACK_IMPORTED_MODULE_0__.cD}px Roboto, sans serif`;
    gameCanvas.fillStyle = "#ff0000";
    gameCanvas.fillText("GAME OVER", maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD / 2 - _char__WEBPACK_IMPORTED_MODULE_0__.cD * 4, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD / 2 + 25);
    gameCanvas.font = `${_char__WEBPACK_IMPORTED_MODULE_0__.cD / 2}px Roboto, sans serif`;
    gameCanvas.fillText("press r to restart", maxWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD / 2 - _char__WEBPACK_IMPORTED_MODULE_0__.cD * 4, maxHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD / 2 + 45);
    gameCanvas.closePath();
  }
  return;
};
const toggleInvCursor = bool => {
  showInvCursor = bool;
  moveChar(0, 0);
};
const moveInvCursor = (dx, dy) => {
  const newCursorX = invCursorX + dx * _char__WEBPACK_IMPORTED_MODULE_0__.cD;
  const newCursorY = invCursorY + dy * _char__WEBPACK_IMPORTED_MODULE_0__.cD;
  if (newCursorX >= invXCoord && newCursorX < invXCoord + invWidth * _char__WEBPACK_IMPORTED_MODULE_0__.cD) {
    invCursorX = newCursorX;
    invCursorPos += dx;
  }
  if (newCursorY >= invYCoord && newCursorY < invYCoord + invHeight * _char__WEBPACK_IMPORTED_MODULE_0__.cD) {
    invCursorY = newCursorY;
    invCursorPos += dy * 5;
  }
  moveChar(0, 0);
};
const useItem = () => {
  if (inventory.length < invCursorPos + 1) {
    gameCanvas.beginPath();
    gameCanvas.font = "10px Roboto, sans serif";
    gameCanvas.fillStyle = "red";
    gameCanvas.fillText("Empty Slot", char[0] * _char__WEBPACK_IMPORTED_MODULE_0__.cD, char[1] * _char__WEBPACK_IMPORTED_MODULE_0__.cD);
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
      case "ATK":
        // Increase Attack
        userATK = 100;
        atkTurns += 50;
        break;
      case "DEF":
        // Increase Defense
        defTurns += 50;
        userDef = 10;
        break;
      case "INVULN":
        // Invulnerability turns
        invulnTurns += 30;
        break;
      case "DEATH":
        // Kill all monsters
        monsters = {};
        break;
      default:
        break;
    }
    if (currentHP > maxHP) {
      currentHP = maxHP;
    }
    if (currentMP > maxMP) {
      currentMP = maxMP;
    }
    inventory = inventory.slice(0, invCursorPos).concat(inventory.slice(invCursorPos + 1, inventory.length));
    moveChar(0, 0);
  }
};
const toggleAttack = (bool = false) => {
  showAttack = bool || !showAttack;
  attackBlock[0] = char[0];
  attackBlock[1] = char[1] + 1;
  moveChar(0, 0);
};
const attackDir = (dx, dy) => {
  attackBlock[0] = char[0] + dx;
  attackBlock[1] = char[1] + dy;
  moveChar(0, 0);
};
const attack = () => {
  monstersMove = true;
  try {
    // const damage = (atkTurns > 0) ? userATK + 50 : userATK;
    const newHP = monsters[attackBlock[0]][attackBlock[1]].takeDmg(userATK);
    if (newHP <= 0) {
      const item = monsters[attackBlock[0]][attackBlock[1]].randomDrop();
      delete monsters[attackBlock[0]][attackBlock[1]];
      items[item].push([attackBlock[0], attackBlock[1]]);
    }
    toggleAttack();
  } catch (err) {
    console.log(err);
    toggleAttack();
    gameCanvas.beginPath();
    gameCanvas.font = "8px Roboto, sans serif";
    gameCanvas.fillStyle = "red";
    gameCanvas.fillText("Waited a turn", char[0] * _char__WEBPACK_IMPORTED_MODULE_0__.cD, char[1] * _char__WEBPACK_IMPORTED_MODULE_0__.cD);
    gameCanvas.closePath();
  }
};
restartGame();

/***/ }),

/***/ "./src/scripts/monster.js":
/*!********************************!*\
  !*** ./src/scripts/monster.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Monster: function() { return /* binding */ Monster; }
/* harmony export */ });
// Random Number Generator
const rng = num => Math.floor(Math.random() * num) + 1;
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
class Monster {
  constructor(type, x, y) {
    switch (type) {
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
  takeDmg(dmg) {
    this.currentHP -= dmg;
    return this.currentHP;
  }
  takeTurn(charX, charY) {
    if (this.attackX !== null) {
      // Attacking the character this turn
      return true; // return true for attacking
    } else {
      if (charX === this.x && Math.abs(charY - this.y) === 1 || charY === this.y && Math.abs(charX - this.x) === 1) {
        this.attackX = charX;
        this.attackY = charY;
        return null;
      }
      //Move the monster towards the player
      return false; // return false for not attacking
    }
  }
  randomDrop() {
    const itemDrop = rng(100);
    switch (this.name) {
      case "Octopus":
        if (itemDrop > 70) {
          return "HP";
        } else {
          return "G";
        }
      case "Werewolf":
        if (itemDrop > 60) {
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
        } else if (itemDrop > 50) {
          return "DEF";
        } else if (itemDrop > 25) {
          return "HP";
          // } else if(itemDrop > 40){
          //     return "MP"
        } else {
          return "G";
        }
      case "Reaper":
        if (itemDrop > 40) {
          return "DEATH";
        } else if (itemDrop > 20) {
          return "INVULN";
        } else {
          return "HP";
        }
      case "Unknown":
        return "G";
    }
  }
}

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");
/* harmony import */ var _scripts_char__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/char */ "./src/scripts/char.js");



let useInvCursor = false;
let showAttack = false;
let paused = true;
const keydownPress = e => {
  if (e.key === "r" || e.key === "R") {
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.restartGame)();
    paused = false;
    showAttack = false;
    useInvCursor = false;
    return;
  }
  if (e.key === " ") {
    e.preventDefault();
  }
  let dx = 0;
  let dy = 0;
  // Movement
  if (e.key == "Right" || e.key == "ArrowRight") {
    dx += 1;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    dx -= 1;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    e.preventDefault();
    dy -= 1;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    e.preventDefault();
    dy += 1;
  }
  if ((e.key === "z" || e.key === "Z") && !paused) {
    // Open Inventory
    useInvCursor = !useInvCursor;
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.toggleInvCursor)(useInvCursor);
  } else if ((e.key === "x" || e.key === "X") && showAttack && !paused) {
    // Cancel Attack
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.toggleAttack)(false);
    showAttack = false;
  } else if (e.key === "Escape" && !useInvCursor) {
    paused = !paused;
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.togglePause)();
  } else if (dx + dy != 0 && !useInvCursor && !showAttack && !paused) {
    // if the character has moved and we're not moving the inventory cursor and we're not attacking
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.moveChar)(dx, dy);
  } else if (dx + dy != 0 && useInvCursor && !paused) {
    // useInvCursor === true => move the inventory cursor
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.moveInvCursor)(dx, dy);
  } else if (e.key === " " && useInvCursor && !paused) {
    // Use Item in inventory
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.useItem)();
  } else if (dx + dy != 0 && showAttack && !paused) {
    (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.attackDir)(dx, dy);
  } else if (e.key === " " && !useInvCursor && !paused) {
    // Attack
    if (showAttack) {
      (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.attack)();
    } else {
      (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.toggleAttack)(true);
    }
    showAttack = !showAttack;
  }
};
const canvas = document.getElementById("gameCanvas");
// canvas.width = window.innerWidth - 10;
// canvas.height = window.innerHeight - 20;
// Set the width and height of canvas
canvas.width = _scripts_game__WEBPACK_IMPORTED_MODULE_1__.maxWidth * _scripts_char__WEBPACK_IMPORTED_MODULE_2__.cD + 300;
canvas.height = _scripts_game__WEBPACK_IMPORTED_MODULE_1__.maxHeight * _scripts_char__WEBPACK_IMPORTED_MODULE_2__.cD;
// moveChar renders the character without moving it
setTimeout(() => {
  (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.moveChar)(0, 0);
  (0,_scripts_game__WEBPACK_IMPORTED_MODULE_1__.togglePause)();
}, 100);
console.log("Game Loaded");
// This will allow us to move the character
document.addEventListener("keydown", keydownPress, false);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBQztJQUMxQ3RCLHdEQUFTLENBQUNuRCxFQUFFLEVBQUVDLEVBQUUsQ0FBQztFQUNyQixDQUFDLE1BQU0sSUFBSTBFLENBQUMsQ0FBQ0MsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDSixZQUFZLElBQUksQ0FBQ0MsTUFBTSxFQUFDO0lBQ2pEO0lBQ0EsSUFBR2pGLFVBQVUsRUFBQztNQUNWNEQscURBQU0sQ0FBQyxDQUFDO0lBQ1osQ0FBQyxNQUFNO01BQ0hGLDJEQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3RCO0lBQ0ExRCxVQUFVLEdBQUcsQ0FBQ0EsVUFBVTtFQUM1QjtBQUNKLENBQUM7QUFFRCxNQUFNaEUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxZQUFZLENBQUM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0FGLE1BQU0sQ0FBQ3NKLEtBQUssR0FBR3hILG1EQUFRLEdBQUduQyw2Q0FBRSxHQUFHLEdBQUc7QUFDbENLLE1BQU0sQ0FBQ3VKLE1BQU0sR0FBR3hILG9EQUFTLEdBQUdwQyw2Q0FBRTtBQUM5QjtBQUNBNkosVUFBVSxDQUFDLE1BQU07RUFDYm5GLHVEQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNkRSwwREFBVyxDQUFDLENBQUM7QUFDakIsQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUNQa0MsT0FBTyxDQUFDdkQsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUMxQjtBQUNBakQsUUFBUSxDQUFDd0osZ0JBQWdCLENBQUMsU0FBUyxFQUFFUCxZQUFZLEVBQUUsS0FBSyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kbmQvLi9zcmMvc2NyaXB0cy9jaGFyLmpzIiwid2VicGFjazovL2RuZC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZG5kLy4vc3JjL3NjcmlwdHMvbW9uc3Rlci5qcyIsIndlYnBhY2s6Ly9kbmQvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/MDA5NCIsIndlYnBhY2s6Ly9kbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG5kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kbmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kbmQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kbmQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmbG9vckJHQ29sb3J9IGZyb20gXCIuL2dhbWVcIjtcclxuXHJcbnZhciBwbGF5ZXJJbWcgPSBuZXcgSW1hZ2UoKTtcclxucGxheWVySW1nLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3MvY2hhcmFjdGVyLnN2Z1wiO1xyXG5cclxuZXhwb3J0IGxldCBjRCA9IDUwOyAvLyBjaGFyYWN0ZXIgZGltZW5zaW9uXHJcbi8vIFBsYXllcnMgc3RhcnRpbmcgcG9zaXRpb25cclxuZXhwb3J0IGNvbnN0IHN0YXJ0WCA9IDk7XHJcbmV4cG9ydCBjb25zdCBzdGFydFkgPSA1O1xyXG5cclxubGV0IHggPSBjRCAqIHN0YXJ0WDtcclxubGV0IHkgPSBjRCAqIHN0YXJ0WTtcclxuXHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVDYW52YXNcIik7XHJcbmNvbnN0IGNoYXIgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckNoYXIobmV3WCwgbmV3WSkge1xyXG4gICAgY2hhci5iZWdpblBhdGgoKTtcclxuICAgIGNoYXIuZmlsbFN0eWxlID0gZmxvb3JCR0NvbG9yO1xyXG4gICAgLy8gY2hhci5yZWN0KHggKiBjRCwgeSAqIGNELCBjRCwgY0QpO1xyXG4gICAgLy8gY2hhci5yZWN0KG5ld1ggKiBjRCwgbmV3WSAqIGNELCBjRCwgY0QpO1xyXG4gICAgY2hhci5maWxsKCk7XHJcbiAgICBjaGFyLmRyYXdJbWFnZShwbGF5ZXJJbWcsIG5ld1ggKiBjRCwgbmV3WSAqIGNELCBjRCwgY0QpO1xyXG5cclxuXHJcbiAgICB4ID0gbmV3WDtcclxuICAgIHkgPSBuZXdZO1xyXG4gICAgY2hhci5jbG9zZVBhdGgoKTsgXHJcbn0iLCJpbXBvcnQgeyBjRCwgcmVuZGVyQ2hhciwgc3RhcnRYLCBzdGFydFkgfSBmcm9tIFwiLi9jaGFyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJ9IGZyb20gXCIuL21vbnN0ZXJcIjtcclxuXHJcbi8vIFJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yXHJcbmNvbnN0IHJuZyA9IChudW0pID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bSkrMTtcclxuLy9JbWFnZXNcclxudmFyIGdvbGRCYXIgPSBuZXcgSW1hZ2UoKTtcclxuZ29sZEJhci5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL2dvbGRJbmdvdHMuc3ZnXCI7XHJcblxyXG52YXIgd2FsbCA9IG5ldyBJbWFnZSgpO1xyXG53YWxsLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3MvV2FsbHMuc3ZnXCI7XHJcbnZhciBkb29yID0gbmV3IEltYWdlKCk7XHJcbmRvb3Iuc3JjID0gXCJcIjtcclxudmFyIGxvY2tlZERvb3IgPSBuZXcgSW1hZ2UoKTtcclxubG9ja2VkRG9vci5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL2RvdWJsZURvb3Iuc3ZnXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZmxvb3JCR0NvbG9yID0gXCIjOTk5XCI7XHJcblxyXG52YXIgaGVhbHRoUG90aW9uID0gbmV3IEltYWdlKCk7XHJcbmhlYWx0aFBvdGlvbi5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL0hlYWx0aFBvdGlvbi5zdmdcIjtcclxudmFyIG1hbmFQb3Rpb24gPSBuZXcgSW1hZ2UoKTtcclxubWFuYVBvdGlvbi5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL01hbmFQb3Rpb24uc3ZnXCI7XHJcbnZhciBhdGtQb3Rpb24gPSBuZXcgSW1hZ2UoKTtcclxuYXRrUG90aW9uLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3MvQVRLUG90aW9uLnN2Z1wiO1xyXG52YXIgZGVmUG90aW9uID0gbmV3IEltYWdlKCk7XHJcbmRlZlBvdGlvbi5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL2RlZlBvdGlvbi5zdmdcIjtcclxudmFyIGludnVsblBvdGlvbiA9IG5ldyBJbWFnZSgpO1xyXG5pbnZ1bG5Qb3Rpb24uc3JjID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTmVtaW5lbTEyMDMvRGFuZ2Vyb3VzbHlOb3JtYWxEdW5nZW9ucy9yZWZzL2hlYWRzL21hc3Rlci9zcmMvc3Zncy9pbnZ1bG5Qb3Rpb24uc3ZnXCI7XHJcbnZhciBkZWF0aFBvdGlvbiA9IG5ldyBJbWFnZSgpO1xyXG5kZWF0aFBvdGlvbi5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL2RlYXRoUG90aW9uLnN2Z1wiO1xyXG5cclxudmFyIHN3b3JkID0gbmV3IEltYWdlKCk7XHJcbnN3b3JkLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3MvYXR0YWNrLnN2Z1wiO1xyXG4vLyB3aWR0aCBhbmQgaGVpZ2h0IG9mIGR1bmdlb25zXHJcbmV4cG9ydCBjb25zdCBtYXhXaWR0aCA9IDE5O1xyXG5leHBvcnQgY29uc3QgbWF4SGVpZ2h0ID0gMTE7XHJcbi8vIEludmVudG9yeSBDb29yZHNcclxuY29uc3QgaW52WENvb3JkID0gbWF4V2lkdGggKiBjRCArIDIyO1xyXG5jb25zdCBpbnZZQ29vcmQgPSA5MDtcclxuY29uc3QgaW52V2lkdGggPSA1O1xyXG5jb25zdCBpbnZIZWlnaHQgPSA1O1xyXG4vLyBJbnZlbnRvcnkgQ3Vyc29yXHJcbmxldCBzaG93SW52Q3Vyc29yID0gZmFsc2U7XHJcbmxldCBpbnZDdXJzb3JYID0gbWF4V2lkdGggKiBjRCArIDIyO1xyXG5sZXQgaW52Q3Vyc29yWSA9IDkwO1xyXG5sZXQgaW52Q3Vyc29yUG9zID0gMDtcclxuLy8gQ2hhciBQb3NcclxubGV0IGNoYXIgPSBbc3RhcnRYLCBzdGFydFldO1xyXG4vLyBIUCBCYXJcclxuY29uc3QgaHBYQ29vcmQgPSBtYXhXaWR0aCAqIGNEICsgMjI7XHJcbmNvbnN0IGhwWUNvb3JkID0gNDU7XHJcbmNvbnN0IGhwSGVpZ2h0ID0gMTVcclxuLy8gVE9ETzogSW1wbGVtZW50IHJvb21zIG9iamVjdCB3aGVuIHJlYWR5XHJcbi8vIGxldCByb29tcyA9IHt9OyAvLyA5ICogOSByb29tLiBwbGF5ZXIgc3RhcnRzIGluIFs1XVs1XVxyXG4vLyBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XHJcbi8vICAgICAgcm9vbXNbaV0gPSB7fTtcclxuLy8gfVxyXG4vLyBsZXQgY3VycmVudFJvb20gPSBbNSw1XTtcclxuLy8gSXRlbXMgaW4gdGhlIHJvb21cclxubGV0IGl0ZW1zID0ge307XHJcbmxldCBtb25zdGVycyA9IHt9O1xyXG5cclxuY29uc3QgcHJldlJvb21GdW5jID0gKHgsIHkpID0+IHtcclxuICAgIHByZXZSb29tWzBdID0geDtcclxuICAgIHByZXZSb29tWzFdID0geTtcclxufVxyXG5cclxuY29uc3QgbmV3Um9vbSA9ICgpID0+IHsgLy8gR2VuZXJhdGUgYSBuZXcgcm9vbVxyXG4gICAgbW9uc3RlcnMgPSB7fTtcclxuICAgIGl0ZW1zID0ge1xyXG4gICAgICAgIFwiR1wiOltdLFxyXG4gICAgICAgIFwiSFBcIjpbXSxcclxuICAgICAgICBcIk1QXCI6W10sXHJcbiAgICAgICAgXCJBVEtcIjogW10sXHJcbiAgICAgICAgXCJERUZcIjogW10sXHJcbiAgICAgICAgXCJJTlZVTE5cIjogW10sXHJcbiAgICAgICAgXCJERUFUSFwiOiBbXSxcclxuICAgIH07XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1heFdpZHRoLTE7IGkrKykge1xyXG4gICAgICAgIG1vbnN0ZXJzW2ldID0ge307XHJcbiAgICB9XHJcbiAgICAvLyBNb25zdGVyIGdlbmVyYXRvclxyXG4gICAgLy8gbGV0IG1vbnN0ZXJOdW0gPSBNYXRoLmZsb29yKChybmcoMTAwKS0oMTAwLW1vbnN0ZXJMaW1pdCoxMCkrOSkvMTApO1xyXG4gICAgbGV0IG1vbnN0ZXJOdW0gPSBNYXRoLmZsb29yKE1hdGgubG9nKHJuZygzNCktMTApKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtb25zdGVyTnVtOyBpKyspe1xyXG4gICAgICAgIGxldCB4ID0gY2hhclswXTtcclxuICAgICAgICBsZXQgeSA9IGNoYXJbMV07XHJcbiAgICAgICAgd2hpbGUoY2hhclswXSA9PT0geCAmJiBjaGFyWzFdID09PSB5KSB7XHJcbiAgICAgICAgICAgIHggPSBybmcobWF4V2lkdGggLSAyKTtcclxuICAgICAgICAgICAgeSA9IHJuZyhtYXhIZWlnaHQgLSAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbW9uc3RlclR5cGUgPSBybmcoMTAwKTtcclxuICAgICAgICBpZiAobW9uc3RlclR5cGUgPiA5OCkge1xyXG4gICAgICAgICAgICBtb25zdGVyc1t4XVt5XSA9IG5ldyBNb25zdGVyKFwiclwiLCB4LCB5KVxyXG4gICAgICAgIH0gZWxzZSBpZiAobW9uc3RlclR5cGUgPiA4MCkge1xyXG4gICAgICAgICAgICBtb25zdGVyc1t4XVt5XSA9IG5ldyBNb25zdGVyKFwidlwiLCB4LCB5KVxyXG4gICAgICAgIH0gZWxzZSBpZiAobW9uc3RlclR5cGUgPiA1MCkge1xyXG4gICAgICAgICAgICBtb25zdGVyc1t4XVt5XSA9IG5ldyBNb25zdGVyKFwid1wiLCB4LCB5KVxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgbW9uc3RlcnNbeF1beV0gPSBuZXcgTW9uc3RlcihcIm9cIiwgeCwgeSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgIC8vIFNvbWUgSGVhbHRoIFBvdGlvbnNcclxuICAgIGNoYXIgPSBbc3RhcnRYLCBzdGFydFldOyBcclxuICAgIHNob3dJbnZDdXJzb3IgPSBmYWxzZTtcclxuICAgIGdvbGRDb3VudCA9IDA7XHJcbiAgICBpbnZlbnRvcnkgPSBbXCJIUFwiLCBcIkFUS1wiLCBcIkRFRlwiLCBcIklOVlVMTlwiLCBcIkRFQVRIXCJdO1xyXG4gICAgY3VycmVudEhQID0gMjA7XHJcbiAgICBtYXhIUCA9IDEwMDtcclxuICAgIGN1cnJlbnRNUCA9IDEwMDtcclxuICAgIG1heE1QID0gMTAwO1xyXG4gICAgdXNlckFUSyA9IDUwO1xyXG4gICAgdXNlckRlZiA9IDA7XHJcbiAgICAvL1BvdGlvbiBFZmZlY3RzXHJcbiAgICBhdGtUdXJucyA9IDA7XHJcbiAgICBkZWZUdXJucyA9IDA7XHJcbiAgICBpbnZ1bG5UdXJucyA9IDA7XHJcbiAgICBwcmV2Um9vbSA9IFswLDBdO1xyXG4gICAgc2hvd0F0dGFjayA9IGZhbHNlOyAvLyBXaGVuIHlvdSBwcmVwIGFuIGF0dGFjaywgaXQnbGwgc2hvdyB5b3VyIGF0dGFjayByYW5nZVxyXG4gICAgYXR0YWNrQmxvY2sgPSBbbnVsbCwgbnVsbF07IC8vIHRoZSBhdHRhY2sgY29vcmRzIG9mIHlvdXIgY2hhcmFjdGVyXHJcbiAgICBtb25zdGVyc01vdmUgPSBmYWxzZTsgLy8gVGVsbHMgeW91IHdoZW4gdGhlIG1vbnN0ZXJzIHNob3VsZCBtb3ZlXHJcbiAgICBnYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgc2hvd0NvbnRyb2xzID0gZmFsc2U7XHJcbiAgICBuZXdSb29tKCk7XHJcbiAgICBpdGVtcyA9IHsgLy8gSW5pdGlhbCBSb29tIGhhcyBpdGVtcyBmb3IgcGxheWVyXHJcbiAgICAgICAgXCJHXCI6IFtbMTcsIDFdLCBbMTcsIDJdXSxcclxuICAgICAgICBcIkhQXCI6IFtbMTYsIDJdLCBbMTYsIDNdXSxcclxuICAgICAgICBcIk1QXCI6IFtdLFxyXG4gICAgICAgIFwiQVRLXCI6IFtdLFxyXG4gICAgICAgIFwiREVGXCI6IFtdLFxyXG4gICAgICAgIFwiSU5WVUxOXCI6IFtdLFxyXG4gICAgICAgIFwiREVBVEhcIjogW10sXHJcbiAgICB9O1xyXG4gICAgbW92ZUNoYXIoMCwgMCk7XHJcbn1cclxuLy8gU29tZSBIZWFsdGggUG90aW9uc1xyXG5sZXQgZ29sZENvdW50ID0gMDtcclxubGV0IGludmVudG9yeSA9IFtcIkhQXCIsIFwiQVRLXCIsIFwiREVGXCIsIFwiSU5WVUxOXCIsIFwiREVBVEhcIl07XHJcbmxldCBjdXJyZW50SFAgPSAyMDtcclxubGV0IG1heEhQID0gMTAwO1xyXG5sZXQgY3VycmVudE1QID0gMTAwO1xyXG5sZXQgbWF4TVAgPSAxMDA7XHJcbmxldCB1c2VyQVRLID0gNTA7XHJcbmxldCB1c2VyRGVmID0gMDtcclxuLy9Qb3Rpb24gRWZmZWN0c1xyXG5sZXQgYXRrVHVybnMgPSAwO1xyXG5sZXQgZGVmVHVybnMgPSAwO1xyXG5sZXQgaW52dWxuVHVybnMgPSAwO1xyXG5sZXQgcHJldlJvb20gPSBbMCwwXTtcclxubGV0IHNob3dBdHRhY2sgPSBmYWxzZTsgLy8gV2hlbiB5b3UgcHJlcCBhbiBhdHRhY2ssIGl0J2xsIHNob3cgeW91ciBhdHRhY2sgcmFuZ2VcclxubGV0IGF0dGFja0Jsb2NrID0gW251bGwsbnVsbF07IC8vIHRoZSBhdHRhY2sgY29vcmRzIG9mIHlvdXIgY2hhcmFjdGVyXHJcbmxldCBtb25zdGVyc01vdmUgPSBmYWxzZTsgLy8gVGVsbHMgeW91IHdoZW4gdGhlIG1vbnN0ZXJzIHNob3VsZCBtb3ZlXHJcbmxldCBnYW1lT3ZlciA9IGZhbHNlOyBcclxubGV0IHNob3dDb250cm9scyA9IGZhbHNlO1xyXG4vLyBUT0RPOiBtaWdodCBoYXZlIHRvIGNoYW5nZSB0byBkeCwgZHkgaW4gdGhlIGZ1dHVyZSB3aGVuIGltcGxlbWVudGluZyBkaWZmZXJlbnQgd2VhcG9ucyBcclxuLy8gRHJhd2luZyBCb2FyZFxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVDYW52YXNcIik7IC8vIFRoZSBhY3R1YWwgY2FudmFzIGVsZW1lbnRcclxuY29uc3QgZ2FtZUNhbnZhcyA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7IC8vIFRoZSBwYWludGJydXNoIHRvIGRyYXcgZXZlcnl0aGluZyByZXF1aXJlZCBmb3IgdGhpcyBnYW1lXHJcbmV4cG9ydCBjb25zdCB0b2dnbGVQYXVzZSA9ICgpID0+e1xyXG4gICAgc2hvd0NvbnRyb2xzID0gIXNob3dDb250cm9scztcclxuICAgIG1vdmVDaGFyKDAsMCk7XHJcbn1cclxuLy8gVGhpcyBpcyB1c2VkIHRvIG1vdmUgdGhlIGNoYXJhY3Rlci4gbW92ZUNoYXIoMCwwKSBpcyB1c3VhbGx5IHVzZWQgdG8gcmUtcmVuZGVyIHRoZSBnYW1lXHJcbmV4cG9ydCBjb25zdCBtb3ZlQ2hhciA9IChkeCwgZHkpID0+IHtcclxuICAgIHdpbmRvdy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgaWYgKGNoYXJbMF0gPCAwKXtyZXR1cm47fSAvLyBUaGUgY2hhcmFjdGVyIGhhcyBkaWVkXHJcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgY2hhcmFjdGVyIGlzIG91dCBvZiBib3VuZHNcclxuICAgIGlmKGNoYXJbMF0gKyBkeCA9PT0gMCB8fCBjaGFyWzBdICsgZHggPT09IG1heFdpZHRoLTEpe1xyXG4gICAgICAgIGlmIChjaGFyWzFdICE9PSAobWF4SGVpZ2h0IC0gMSkgLyAyKSB7cmV0dXJuO31cclxuICAgIH1cclxuICAgIGlmKGNoYXJbMV0gKyBkeSA9PT0gMCB8fCBjaGFyWzFdICsgZHkgPT09IG1heEhlaWdodC0xKXtcclxuICAgICAgICBpZiAoY2hhclswXSAhPT0gKG1heFdpZHRoIC0gMSkgLyAyKSAge3JldHVybjt9XHJcbiAgICB9XHJcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgbW9uc3RlciBpcyBibG9ja2luZyB0aGUgY2hhcmFjdGVycyBtb3ZlbWVudFxyXG4gICAgbGV0IG1vbnN0ZXJCbG9jayA9IGZhbHNlOyBcclxuICAgIE9iamVjdC52YWx1ZXMobW9uc3RlcnMpLmZvckVhY2gocm93ID0+IHtcclxuICAgICAgICBPYmplY3QudmFsdWVzKHJvdykuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIueCA9PT0gY2hhclswXSArIGR4ICYmIG1vbnN0ZXIueSA9PT0gY2hhclsxXSArIGR5KSB7XHJcbiAgICAgICAgICAgICAgICBtb25zdGVyQmxvY2sgPSB0cnVlOyAvLyBDaGFyYWN0ZXIgaXMgYmxvY2tlZCBmcm9tIG1vdmluZyBoZXJlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICAgIC8vIElmIG5vdCBibG9ja2VkIGJ5IG1vbnN0ZXIsIGNvbnRpbnVlIHRoZSBhY3Rpb25cclxuICAgIFxyXG4gICAgaWYoIW1vbnN0ZXJCbG9jayAmJiAhc2hvd0NvbnRyb2xzKXtcclxuICAgICAgICBjaGFyWzBdICs9IGR4O1xyXG4gICAgICAgIGNoYXJbMV0gKz0gZHk7XHJcbiAgICAgICAgaWYgKHByZXZSb29tWzBdID09IGNoYXJbMF0gJiYgcHJldlJvb21bMV0gPT0gY2hhclsxXSl7XHJcbiAgICAgICAgICAgIGNoYXJbMF0gLT0gZHg7XHJcbiAgICAgICAgICAgIGNoYXJbMV0gLT0gZHk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1vdmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgcGxheWVyIHdlbnQgdGhyb3VnaCBhIGRvb3JcclxuICAgICAgICAvLyBUT0RPOiBNYWtlIHN1cmUgdG8gb25seSByZW5kZXIgZG9vcnMgdGhhdCBhcmUgdmFsaWQgKHJpZ2h0IG5vdyBpdCdzIGluZmluaXRlIGR1bmdlb24pXHJcbiAgICAgICAgaWYoY2hhclsxXSA9PT0gKG1heEhlaWdodC0xKS8yKXtcclxuICAgICAgICAgICAgaWYgKGNoYXJbMF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJbMF0gPSBtYXhXaWR0aCAtIDI7XHJcbiAgICAgICAgICAgICAgICBwcmV2Um9vbUZ1bmMoY2hhclswXSsxLCBjaGFyWzFdKVxyXG4gICAgICAgICAgICAgICAgbmV3Um9vbSgpO1xyXG4gICAgICAgICAgICAgICAgbW92ZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyWzBdID09PSBtYXhXaWR0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJbMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgcHJldlJvb21GdW5jKGNoYXJbMF0tMSwgY2hhclsxXSlcclxuICAgICAgICAgICAgICAgIG5ld1Jvb20oKTtcclxuICAgICAgICAgICAgICAgIG1vdmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYoY2hhclswXSA9PT0gKG1heFdpZHRoLTEpLzIpe1xyXG4gICAgICAgICAgICBpZiAoY2hhclsxXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhclsxXSA9IG1heEhlaWdodC0yO1xyXG4gICAgICAgICAgICAgICAgcHJldlJvb21GdW5jKGNoYXJbMF0sIGNoYXJbMV0rMSlcclxuICAgICAgICAgICAgICAgIG5ld1Jvb20oKTtcclxuICAgICAgICAgICAgICAgIG1vdmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhclsxXSA9PT0gbWF4SGVpZ2h0IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2hhclsxXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBwcmV2Um9vbUZ1bmMoY2hhclswXSwgY2hhclsxXS0xKVxyXG4gICAgICAgICAgICAgICAgbmV3Um9vbSgpO1xyXG4gICAgICAgICAgICAgICAgbW92ZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiB0aGUgcGxheWVyIG1vdmVkIChidXQgbm90IHRvIGFub3RoZXIgcm9vbSkgYW5kIHRoZSBtb25zdGVycyBhcmUgYWxsb3dlZCB0byBtb3ZlXHJcbiAgICAgICAgLy8gdGhlbiB0aGUgbW9uc3RlcnMgd2lsbCB0YWtlIHRoZWlyIHR1cm5cclxuICAgICAgICBpZiAoKGR4ICsgZHkgIT09IDAgfHwgbW9uc3RlcnNNb3ZlKSAmJiAhbW92ZWRSb29tKSB7XHJcbiAgICAgICAgICAgIG1vbnN0ZXJzTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKG1vbnN0ZXJzKS5mb3JFYWNoKHJvdyA9PiB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKHJvdykuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5tb3ZlZCkgeyByZXR1cm47IH0gLy8gaWYgdGhlIG1vbnN0ZXIgYWxyZWFkeSBtb3ZlZCB0aGlzIHR1cm4sXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9uc3RlclR1cm4gPSBtb25zdGVyLnRha2VUdXJuKGNoYXJbMF0sIGNoYXJbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyVHVybikgeyAvLyBJZiB0aGlzIHJldHVybnMgdHJ1ZSwgdGhlIG1vbnN0ZXIgd2lsbCBiZSBhdHRhY2tpbmcgYSBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW52dWxuVHVybnMgPT09IDAgJiYgbW9uc3Rlci5hdHRhY2tYID09PSBjaGFyWzBdICYmIG1vbnN0ZXIuYXR0YWNrWSA9PT0gY2hhclsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcGxheWVyIGlzIGluIHRoZSBhdHRhY2sgcmFuZ2UsIGxvc2UgaGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SFAgLT0gKG1vbnN0ZXIuZG1nIC0gdXNlckRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXR0YWNrIGhhcyBjb21wbGV0ZWQuIE5vdyBzZXQgaXQgdG8gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmF0dGFja1ggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmF0dGFja1kgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9uc3RlclR1cm4gPT09IGZhbHNlKSB7IC8vIE5vdCBjbG9zZSBlbm91Z2ggdG8gYXR0YWNrIHRoZSBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGlmZmVyZW5jZSBiZXR3ZWVuIGNoYXIgYW5kIG1vbnN0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHhNb24gPSBjaGFyWzBdIC0gbW9uc3Rlci54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkeU1vbiA9IGNoYXJbMV0gLSBtb25zdGVyLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgc3RlcCB0b3dhcmRzIHRoZSBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHhNb25Ob3JtID0gTWF0aC5hYnMoZHhNb24pIC8gZHhNb24gfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHlNb25Ob3JtID0gTWF0aC5hYnMoZHlNb24pIC8gZHlNb24gfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV3IFBvcyBpZiB0aGV5IG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9uWCA9IG1vbnN0ZXIueCArIGR4TW9uTm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9uWSA9IG1vbnN0ZXIueSArIGR5TW9uTm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuIG1vdmUgaW4gdGhhdCBkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbk1vdmVYID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbk1vdmVZID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbW9uc3RlcnMgYXJlIGJsb2NraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyc1ttb25zdGVyLnhdW25ld01vblldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1vdmVZID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJzW25ld01vblhdW21vbnN0ZXIueV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuTW92ZVggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUZW1wb3JhcmlseSBzYXZlIHRoZSBtb25zdGVyLCBkZWxldGUgdGhlIG1vbnN0ZXIgZnJvbSBtb25zdGVycyBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlbiBtb3ZlIHRoZSBtb25zdGVyIGFuZCBzYXZlIGl0IGluIHRoZSBuZXcgY29vcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBNb24gPSBtb25zdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9uc3RlcnNbbW9uc3Rlci54XVttb25zdGVyLnldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChybmcoMTAwKSA8IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuTW92ZVkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTW9uLnkgPSBuZXdNb25ZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNhbk1vdmVYKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTW9uLnggPSBuZXdNb25YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk1vdmVYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE1vbi54ID0gbmV3TW9uWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FuTW92ZVkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTW9uLnkgPSBuZXdNb25ZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBNb24ubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyc1t0ZW1wTW9uLnhdW3RlbXBNb24ueV0gPSB0ZW1wTW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFBvdGlvbnMgd2VhcnMgb2ZmIG92ZXIgdGltZVxyXG4gICAgICAgICAgICBpZiAoaW52dWxuVHVybnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZ1bG5UdXJucy0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZWZUdXJucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGRlZlR1cm5zLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmVHVybnMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEZWYgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdGtUdXJucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGF0a1R1cm5zLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoYXRrVHVybnMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBVEsgPSA1MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBvbmNlIGFsbCB0aGUgbW9uc3RlcnMgaGF2ZSBtb3ZlZCwgd2Ugd2lsbCBzZXQgaXQgYmFjayB0byBmYWxzZSBmb3IgbmV4dCB0dXJuXHJcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhtb25zdGVycykuZm9yRWFjaChyb3cgPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKHJvdykuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSBmYWxzZTsgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBJZiBjdXJyZW50SFAgPD0gMCwgd2Ugc2V0IGdhbWVPdmVyIHRvIHRydWUgc28gd2UgcGxheWVyIGNhbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgaWYgKGN1cnJlbnRIUCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IDA7XHJcbiAgICAgICAgICAgIGNoYXJbMF0gPSAtMTAwMDtcclxuICAgICAgICAgICAgY2hhclsxXSA9IC0xMDAwO1xyXG4gICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmKHNob3dDb250cm9scyl7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5iZWdpblBhdGgoKTtcclxuICAgICAgICBnYW1lQ2FudmFzLmdsb2JhbEFscGhhID0gMC41O1xyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbFN0eWxlID0gXCIjNTU1XCI7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5yZWN0KDEwMCwgMTAwLCAobWF4V2lkdGgtNCkqY0QsIChtYXhIZWlnaHQtNCkqY0QpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbCgpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZm9udCA9IFwiMjVweCBSb2JvdG8sIHNhbnMgc2VyaWZcIlxyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbFN0eWxlID0gXCIjRkZGXCI7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5maWxsVGV4dChcIkFycm93IGtleXMgPSBNb3ZlbWVudFwiLCAxMTAsIDE0MClcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxUZXh0KFwiU3BhY2ViYXIgPSBVc2UgSXRlbS9TdGFydCBBdHRhY2tcIiwgMTEwLCAxNzApXHJcbiAgICAgICAgZ2FtZUNhbnZhcy5maWxsVGV4dChcIlogPSBJbnZlbnRvcnlcIiwgMTEwLCAyMDApXHJcbiAgICAgICAgZ2FtZUNhbnZhcy5maWxsVGV4dChcIlNwYWNlYmFyIChBZnRlciBTdGFydGluZyBBdHRhY2spID0gQXR0YWNrL1dhaXRcIiwgMTEwLCAyMzApXHJcbiAgICAgICAgZ2FtZUNhbnZhcy5maWxsVGV4dChcIlIgPSBSZXN0YXJ0cyBHYW1lXCIsIDExMCwgMjYwKVxyXG4gICAgICAgIGdhbWVDYW52YXMuZm9udCA9IFwiMTVweCBSb2JvdG8sIHNhbnMgc2VyaWZcIlxyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbFRleHQoXCJXYWl0aW5nIG9jY3VycyB3aGVuIHlvdSBoaXQgYW4gZW1wdHkgYXJlYVwiLCA1MDAsIDI0NSlcclxuICAgICAgICBnYW1lQ2FudmFzLmZvbnQgPSBcIjMwcHggUm9ib3RvLCBzYW5zIHNlcmlmXCJcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxUZXh0KFwiRXNjID0gU2hvdy9IaWRlIENvbnRyb2xzXCIsIDExMCwgNDMwKVxyXG4gICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKClcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge3JldHVybjt9IC8vIGlmIGNoYXJhY3RlciBpcyBibG9ja2VkIGJ5IHRoZSBtb25zdGVyLCBkb24ndCBtb3ZlIGhlcmVcclxuICAgIC8vIERyYXdpbmcgRmxvb3IsIFdhbGxzLCBJdGVtcywgYW5kIE1vbnN0ZXJzXHJcbiAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgaWYoc2hvd0ludkN1cnNvciB8fCBnYW1lT3Zlcil7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5nbG9iYWxBbHBoYSA9IDAuNTtcclxuICAgIH1cclxuICAgIGdhbWVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIG1heFdpZHRoICogY0QsIG1heEhlaWdodCAqIGNEKTtcclxuICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbWF4V2lkdGgtMTsgaSsrKXtcclxuICAgICAgICBmb3IobGV0IGogPSAxOyBqIDwgbWF4SGVpZ2h0LTE7IGorKyl7XHJcbiAgICAgICAgICAgIC8vRHVuZ2VvbiBGbG9vclxyXG4gICAgICAgICAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBnYW1lQ2FudmFzLnJlY3QoaSAqIGNELCBqICogY0QsIGNELCBjRCk7XHJcbiAgICAgICAgICAgIGdhbWVDYW52YXMuZmlsbFN0eWxlID0gZmxvb3JCR0NvbG9yO1xyXG4gICAgICAgICAgICBnYW1lQ2FudmFzLmZpbGwoKTtcclxuICAgICAgICAgICAgZ2FtZUNhbnZhcy5jbG9zZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgLy8gRHJhd2luZyB0aGUgd2FsbHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4V2lkdGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IG1heFdpZHRoIC0gMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBtYXhIZWlnaHQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGogPT09IChtYXhIZWlnaHQgLSAxKSAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpLGopO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2Um9vbVswXSA9PT0gaSAmJiBwcmV2Um9vbVsxXSA9PT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShsb2NrZWREb29yLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShkb29yLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKHdhbGwsIGkgKiBjRCwgaiAqIGNELCBjRCwgY0QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1heEhlaWdodDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChqID09PSAwIHx8IGogPT09IG1heEhlaWdodCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAobWF4V2lkdGggLSAxKSAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldlJvb21bMF0gPT09IGkgJiYgcHJldlJvb21bMV0gPT09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UobG9ja2VkRG9vciwgaSAqIGNELCBqICogY0QsIGNELCBjRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoZG9vciwgaSAqIGNELCBqICogY0QsIGNELCBjRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZSh3YWxsLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERyYXdpbmcgSXRlbXNcclxuICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5mb3JFYWNoKGl0ZW1OYW1lID0+e1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpdGVtc1tpdGVtTmFtZV0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAvLyBJZiBjaGFyYWN0ZXIgaXMgc3RhbmRpbmcgb24gdGhlIGl0ZW0sIHB1c2ggaXQgdG8gdGhlaXIgaW52ZW50b3J5XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBpdGVtc1tpdGVtTmFtZV1baV1bMF07XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpdGVtc1tpdGVtTmFtZV1baV1bMV07XHJcbiAgICAgICAgICAgIGlmICggeCA9PT0gY2hhclswXSAmJiB5ID09PSBjaGFyWzFdKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXRlbU5hbWUgPT09IFwiR1wiKXtnb2xkQ291bnQrKzt9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgaW52ZW50b3J5LnB1c2goaXRlbU5hbWUpO31cclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtc1tpdGVtTmFtZV0gPSBpdGVtc1tpdGVtTmFtZV0uc2xpY2UoMCwgaSkuY29uY2F0KGl0ZW1zW2l0ZW1OYW1lXS5zbGljZShpICsgMSwgaXRlbXMubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goaXRlbU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJHXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKGdvbGRCYXIsIHggKiBjRCwgeSAqIGNELCBjRCwgY0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSFBcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoaGVhbHRoUG90aW9uLCB4ICogY0QsIHkgKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1QXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKG1hbmFQb3Rpb24sIHggKiBjRCwgeSAqIGNELCBjRCwgY0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQVRLXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKGF0a1BvdGlvbiwgeCAqIGNELCB5ICogY0QsIGNELCBjRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJERUZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoZGVmUG90aW9uLCB4ICogY0QsIHkgKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklOVlVMTlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShpbnZ1bG5Qb3Rpb24sIHggKiBjRCwgeSAqIGNELCBjRCwgY0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiREVBVEhcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoZGVhdGhQb3Rpb24sIHggKiBjRCwgeSAqIGNELCBjRCwgY0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVua25vd24gSXRlbTogJHtpdGVtTmFtZX1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IG1heFdpZHRoOyBpKyspIHtcclxuICAgIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1heEhlaWdodDsgaisrKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCByZW5kZXJHb2xkID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIGxldCByZW5kZXJIUCA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICBsZXQgcmVuZGVyTVAgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgLy8gcmVuZGVyIFdhbGxzLlxyXG4gICAgLy8gICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggaXRlbXNcclxuICAgIC8vICAgICAgICAgLy8gZm9yKGxldCBrID0gMDsgayA8IHdDW2ldW2pdLmxlbmd0aDsgaysrKXtcclxuICAgIC8vICAgICAgICAgLy8gICAgIHN3aXRjaCAod0NbaV1bal1ba10pIHtcclxuICAgIC8vICAgICAgICAgLy8gICAgICAgICBjYXNlIFwid1wiOlxyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICAvLyBnYW1lQ2FudmFzLmRyYXdJbWFnZSh3YWxsLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTtcclxuICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgcmVuZGVyV2FsbCA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgIGNhc2UgXCJkXCI6XHJcbiAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIHJlbmRlckRvb3IgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgLy8gICAgICAgICBjYXNlIFwiR1wiOlxyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICAvLyBnYW1lQ2FudmFzLmRyYXdJbWFnZShnb2xkQmFyLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTtcclxuICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgcmVuZGVyR29sZCA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgIGNhc2UgXCJIUFwiOlxyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICAvLyBnYW1lQ2FudmFzLmRyYXdJbWFnZShoZWFsdGhQb3Rpb24sIGkgKiBjRCwgaiAqIGNELCBjRCwgY0QpO1xyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICByZW5kZXJIUCA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgIGNhc2UgXCJNUFwiOlxyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICAvLyBnYW1lQ2FudmFzLmRyYXdJbWFnZShtYW5hUG90aW9uLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTtcclxuICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgcmVuZGVyTVAgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgLy8gICAgICAgICBkZWZhdWx0OlxyXG4gICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgLy8gICAgIH1cclxuICAgIC8vICAgICAgICAgLy8gfVxyXG4gICAgLy8gICAgICAgICBpZiAocmVuZGVyR29sZCkgeyBnYW1lQ2FudmFzLmRyYXdJbWFnZShnb2xkQmFyLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTsgfVxyXG4gICAgLy8gICAgICAgICBpZiAocmVuZGVySFApIHsgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoaGVhbHRoUG90aW9uLCBpICogY0QsIGogKiBjRCwgY0QsIGNEKTsgfVxyXG4gICAgLy8gICAgICAgICBpZiAocmVuZGVyTVApIHsgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UobWFuYVBvdGlvbiwgaSAqIGNELCBqICogY0QsIGNELCBjRCk7IH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBSZW5kZXIgdGhlIGNoYXJhY3RlclxyXG4gICAgLy8gSWYgdGhleSdyZSBpbnZ1bG4sIG1ha2UgdGhlbSAwLjEgdG8gaW5kaWNhdGUgaW52dWxuZXJhYmlsaXR5XHJcbiAgICBpZihpbnZ1bG5UdXJucyA+IDApe1xyXG4gICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAwLjE7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDaGFyKGNoYXJbMF0sIGNoYXJbMV0pO1xyXG4gICAgaWYgKGludnVsblR1cm5zID4gMCkge1xyXG4gICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgfVxyXG4gICAgLy8gUmVuZGVyIE1vbnN0ZXJzXHJcbiAgICBPYmplY3QudmFsdWVzKG1vbnN0ZXJzKS5mb3JFYWNoKHJvdyA9PiB7XHJcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhyb3cpLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgbW9uc3RlciA9IG1vbnN0ZXJzW2ldW2pdO1xyXG4gICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShtb25zdGVyLm1vbnN0ZXJJTUcsIG1vbnN0ZXIueCAqIGNELCBtb25zdGVyLnkgKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgLy8gSWYgbW9uc3RlcnMgaGF2ZSBsZXNzIGhlYWx0aCB0aGFuIG1heCBoZWFsdGgsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci5jdXJyZW50SFAgPCBtb25zdGVyLm1heEhQKSB7IFxyXG4gICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5maWxsU3R5bGUgPSBcIiNGRkZcIjtcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMucmVjdChtb25zdGVyLngqY0QsIG1vbnN0ZXIueSpjRCwgY0QsIDEwKTtcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwiI0YwMFwiO1xyXG4gICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5yZWN0KG1vbnN0ZXIueCAqIGNELCBtb25zdGVyLnkgKiBjRCwgY0QgKiAobW9uc3Rlci5jdXJyZW50SFAgLyBtb25zdGVyLm1heEhQKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiBtb25zdGVyIGlzIGF0dGFja2luZywgc2hvdyBkaXJlY3Rpb25cclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIuYXR0YWNrWCAhPT0gbnVsbCkgeyBcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAwLjU7XHJcbiAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShtb25zdGVyLm1vbnN0ZXJBVEssIG1vbnN0ZXIuYXR0YWNrWCAqIGNELCBtb25zdGVyLmF0dGFja1kgKiBjRCwgY0QsIGNEKTtcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBnYW1lQ2FudmFzLmNsb3NlUGF0aCgpO1xyXG4gICAgaWYoc2hvd0F0dGFjayA9PT0gdHJ1ZSl7IC8vIFNob3cgeW91ciBhdHRhY2sgcmFuZ2VcclxuICAgICAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAwLjc7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2Uoc3dvcmQsIGF0dGFja0Jsb2NrWzBdKmNELCBhdHRhY2tCbG9ja1sxXSpjRCwgY0QsIGNEKVxyXG4gICAgICAgIGdhbWVDYW52YXMuZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNob3dJbnZDdXJzb3IgfHwgZ2FtZU92ZXIpIHtcclxuICAgICAgICBnYW1lQ2FudmFzLmdsb2JhbEFscGhhID0gMTtcclxuICAgIH1cclxuICAgIC8vIEludmVudG9yeSBVSVxyXG4gICAgZ2FtZUNhbnZhcy5iZWdpblBhdGgoKTtcclxuICAgIGdhbWVDYW52YXMucmVjdChtYXhXaWR0aCAqIGNELCAwLCAzMDAsIChtYXhIZWlnaHQqY0QpKTtcclxuICAgIGdhbWVDYW52YXMuZmlsbFN0eWxlID0gXCIjNjY2NjY2XCJcclxuICAgIGdhbWVDYW52YXMuZmlsbCgpO1xyXG4gICAgZ2FtZUNhbnZhcy5yZWN0KGludlhDb29yZCwgaW52WUNvb3JkLCBjRCppbnZXaWR0aCwgKGludkhlaWdodCAqIGNEKSlcclxuICAgIGdhbWVDYW52YXMuc3Ryb2tlU3R5bGUgPSBcIiNGRkZcIjtcclxuICAgIGdhbWVDYW52YXMuc3Ryb2tlKCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW52ZW50b3J5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgIHN3aXRjaChpbnZlbnRvcnlbaV0pe1xyXG4gICAgICAgICAgICBjYXNlIFwiSFBcIjpcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKGhlYWx0aFBvdGlvbiwgKGklaW52V2lkdGgpKmNEICsgaW52WENvb3JkLCBNYXRoLmZsb29yKGkvaW52V2lkdGgpKmNEICsgaW52WUNvb3JkLCBjRCwgY0QpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1QXCI6XHJcbiAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShtYW5hUG90aW9uLCAoaSVpbnZXaWR0aCkqY0QgKyBpbnZYQ29vcmQsIE1hdGguZmxvb3IoaS9pbnZXaWR0aCkqY0QgKyBpbnZZQ29vcmQsIGNELCBjRClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQVRLXCI6XHJcbiAgICAgICAgICAgICAgICBnYW1lQ2FudmFzLmRyYXdJbWFnZShhdGtQb3Rpb24sIChpJWludldpZHRoKSpjRCArIGludlhDb29yZCwgTWF0aC5mbG9vcihpL2ludldpZHRoKSpjRCArIGludllDb29yZCwgY0QsIGNEKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJERUZcIjpcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKGRlZlBvdGlvbiwgKGklaW52V2lkdGgpKmNEICsgaW52WENvb3JkLCBNYXRoLmZsb29yKGkvaW52V2lkdGgpKmNEICsgaW52WUNvb3JkLCBjRCwgY0QpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIklOVlVMTlwiOlxyXG4gICAgICAgICAgICAgICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoaW52dWxuUG90aW9uLCAoaSVpbnZXaWR0aCkqY0QgKyBpbnZYQ29vcmQsIE1hdGguZmxvb3IoaS9pbnZXaWR0aCkqY0QgKyBpbnZZQ29vcmQsIGNELCBjRClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiREVBVEhcIjpcclxuICAgICAgICAgICAgICAgIGdhbWVDYW52YXMuZHJhd0ltYWdlKGRlYXRoUG90aW9uLCAoaSVpbnZXaWR0aCkqY0QgKyBpbnZYQ29vcmQsIE1hdGguZmxvb3IoaS9pbnZXaWR0aCkqY0QgKyBpbnZZQ29vcmQsIGNELCBjRClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2FtZUNhbnZhcy5jbG9zZVBhdGgoKTtcclxuICAgIC8vIEhQIEJhclxyXG4gICAgZ2FtZUNhbnZhcy5iZWdpblBhdGgoKTtcclxuICAgIGdhbWVDYW52YXMucmVjdChocFhDb29yZCwgaHBZQ29vcmQsIGNEKjUsIGhwSGVpZ2h0KTtcclxuICAgIGdhbWVDYW52YXMuZmlsbFN0eWxlID0gXCIjRkZGXCI7XHJcbiAgICBnYW1lQ2FudmFzLmZpbGwoKTtcclxuICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICAvLyBDdXJyZW50IEhQXHJcbiAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgZ2FtZUNhbnZhcy5yZWN0KGhwWENvb3JkLCBocFlDb29yZCwgKGNEKjUgKiBjdXJyZW50SFAvbWF4SFApLCBocEhlaWdodCk7XHJcbiAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwiI0YwMFwiO1xyXG4gICAgZ2FtZUNhbnZhcy5maWxsKCk7XHJcbiAgICBnYW1lQ2FudmFzLmNsb3NlUGF0aCgpO1xyXG4gICAgLy8gTVAgQmFyXHJcbiAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgZ2FtZUNhbnZhcy5yZWN0KGhwWENvb3JkLCBocFlDb29yZCtocEhlaWdodCwgY0QqNSwgaHBIZWlnaHQpO1xyXG4gICAgZ2FtZUNhbnZhcy5maWxsU3R5bGUgPSBcIiNGRkZcIjtcclxuICAgIGdhbWVDYW52YXMuZmlsbCgpO1xyXG4gICAgZ2FtZUNhbnZhcy5jbG9zZVBhdGgoKTtcclxuICAgIC8vIEN1cnJlbnQgTVBcclxuICAgIGdhbWVDYW52YXMuYmVnaW5QYXRoKCk7XHJcbiAgICBnYW1lQ2FudmFzLnJlY3QoaHBYQ29vcmQsIGhwWUNvb3JkK2hwSGVpZ2h0LCAoY0QqNSAqIGN1cnJlbnRNUC9tYXhNUCksIGhwSGVpZ2h0KTtcclxuICAgIGdhbWVDYW52YXMuZmlsbFN0eWxlID0gXCIjMDBGXCI7XHJcbiAgICBnYW1lQ2FudmFzLmZpbGwoKTtcclxuICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICAvLyBJbnZlbnRvcnkgQ3Vyc29yXHJcbiAgICBpZiAoc2hvd0ludkN1cnNvcikge1xyXG4gICAgICAgIGdhbWVDYW52YXMuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5mb250ID0gYCR7Y0R9cHggUm9ib3RvLCBzYW5zIHNlcmlmYDtcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbFRleHQoXCJJTlZFTlRPUllcIiwgKG1heFdpZHRoICogY0QgLyAyKS1jRCo0LCBtYXhIZWlnaHQgKiBjRCAvIDIpO1xyXG4gICAgICAgIGdhbWVDYW52YXMucmVjdChpbnZDdXJzb3JYLCBpbnZDdXJzb3JZLCBjRCwgY0QpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuc3Ryb2tlU3R5bGUgPSBcIiNGRkZcIjtcclxuICAgICAgICBnYW1lQ2FudmFzLnN0cm9rZSgpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcbiAgICAvLyBQb3Rpb24gU3RhdHVzXHJcbiAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgZ2FtZUNhbnZhcy5mb250ID0gYCR7Y0QgLyAyfXB4IFJvYm90bywgc2FucyBzZXJpZmA7XHJcbiAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xyXG4gICAgaWYgKGRlZlR1cm5zID4gMCkge1xyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbFRleHQoYERFRiBVUDogJHtkZWZUdXJuc31gLCBtYXhXaWR0aCAqIGNEICsgNTAsIG1heEhlaWdodCAqIGNEIC0gMTUwKTtcclxuICAgIH1cclxuICAgIGlmIChhdGtUdXJucyA+IDApIHtcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxUZXh0KGBBVEsgVVA6ICR7YXRrVHVybnN9YCwgbWF4V2lkdGggKiBjRCArIDUwLCBtYXhIZWlnaHQgKiBjRCAtIDEwMCk7XHJcbiAgICB9XHJcbiAgICBnYW1lQ2FudmFzLmNsb3NlUGF0aCgpO1xyXG4gICAgLy8gR29sZCBDb3VudGVyXHJcbiAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgZ2FtZUNhbnZhcy5kcmF3SW1hZ2UoZ29sZEJhciwgbWF4V2lkdGgqY0QrMjAsIDAsIGNELCBjRCk7XHJcbiAgICBnYW1lQ2FudmFzLmZvbnQgPSBcIjE1cHggUm9ib3RvLCBzYW5zIHNlcmlmXCI7XHJcbiAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwiI2ZmZDcwMFwiXHJcbiAgICBnYW1lQ2FudmFzLmZpbGxUZXh0KGB4ICR7Z29sZENvdW50fWAsIG1heFdpZHRoICogNTAgKyA4MCwgMzAsIDIyNSk7XHJcbiAgICBnYW1lQ2FudmFzLmNsb3NlUGF0aCgpO1xyXG4gICAgaWYoZ2FtZU92ZXIpeyAvLyBJZiBwbGF5ZXIgZGllZFxyXG4gICAgICAgIGdhbWVDYW52YXMuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5mb250ID0gYCR7Y0R9cHggUm9ib3RvLCBzYW5zIHNlcmlmYDtcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwiI2ZmMDAwMFwiO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZmlsbFRleHQoXCJHQU1FIE9WRVJcIiwgKG1heFdpZHRoICogY0QgLyAyKSAtIGNEICogNCwgbWF4SGVpZ2h0ICogY0QgLyAyICsgMjUpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZm9udCA9IGAke2NELzJ9cHggUm9ib3RvLCBzYW5zIHNlcmlmYDtcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxUZXh0KFwicHJlc3MgciB0byByZXN0YXJ0XCIsIChtYXhXaWR0aCAqIGNEIC8gMikgLSBjRCAqIDQsIG1heEhlaWdodCAqIGNEIC8gMiArIDQ1KVxyXG4gICAgICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0b2dnbGVJbnZDdXJzb3IgPSBib29sID0+IHtcclxuICAgIHNob3dJbnZDdXJzb3IgPSBib29sO1xyXG4gICAgbW92ZUNoYXIoMCwwKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vdmVJbnZDdXJzb3IgPSAoZHgsIGR5KSA9PiB7XHJcbiAgICBjb25zdCBuZXdDdXJzb3JYID0gaW52Q3Vyc29yWCArIGR4ICogY0Q7XHJcbiAgICBjb25zdCBuZXdDdXJzb3JZID0gaW52Q3Vyc29yWSArIGR5ICogY0Q7XHJcbiAgICBpZihuZXdDdXJzb3JYID49IGludlhDb29yZCAmJiBuZXdDdXJzb3JYIDwgaW52WENvb3JkICsgKGludldpZHRoICogY0QpKXtcclxuICAgICAgICBpbnZDdXJzb3JYID0gbmV3Q3Vyc29yWDtcclxuICAgICAgICBpbnZDdXJzb3JQb3MgKz0gZHhcclxuICAgIH1cclxuICAgIGlmIChuZXdDdXJzb3JZID49IGludllDb29yZCAmJiBuZXdDdXJzb3JZIDwgaW52WUNvb3JkICsoaW52SGVpZ2h0ICogY0QpKSB7XHJcbiAgICAgICAgaW52Q3Vyc29yWSA9IG5ld0N1cnNvclk7XHJcbiAgICAgICAgaW52Q3Vyc29yUG9zICs9IChkeSo1KVxyXG4gICAgfVxyXG4gICAgbW92ZUNoYXIoMCwwKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUl0ZW0gPSAoKSA9PiB7XHJcbiAgICBpZiAoaW52ZW50b3J5Lmxlbmd0aCA8IGludkN1cnNvclBvcyArIDEpIHtcclxuICAgICAgICBnYW1lQ2FudmFzLmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuZm9udCA9IFwiMTBweCBSb2JvdG8sIHNhbnMgc2VyaWZcIjtcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5maWxsVGV4dChcIkVtcHR5IFNsb3RcIiwgY2hhclswXSAqIGNELCBjaGFyWzFdICogY0QpO1xyXG4gICAgICAgIGdhbWVDYW52YXMuY2xvc2VQYXRoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFVzZSBJdGVtXHJcbiAgICAgICAgc3dpdGNoIChpbnZlbnRvcnlbaW52Q3Vyc29yUG9zXSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiSFBcIjpcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRIUCArPSAyNTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTVBcIjpcclxuICAgICAgICAgICAgICAgIC8vIE1hbmFcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNUCArPSA1MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQVRLXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBJbmNyZWFzZSBBdHRhY2tcclxuICAgICAgICAgICAgICAgIHVzZXJBVEsgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBhdGtUdXJucyArPSA1MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiREVGXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBJbmNyZWFzZSBEZWZlbnNlXHJcbiAgICAgICAgICAgICAgICBkZWZUdXJucyArPSA1MDtcclxuICAgICAgICAgICAgICAgIHVzZXJEZWYgPSAxMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiSU5WVUxOXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBJbnZ1bG5lcmFiaWxpdHkgdHVybnNcclxuICAgICAgICAgICAgICAgIGludnVsblR1cm5zICs9IDMwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJERUFUSFwiOlxyXG4gICAgICAgICAgICAgICAgLy8gS2lsbCBhbGwgbW9uc3RlcnNcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJzID0ge307XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudEhQID4gbWF4SFApIHtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbWF4SFA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50TVAgPiBtYXhNUCl7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNUCA9IG1heE1QO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnZlbnRvcnkgPSBpbnZlbnRvcnkuc2xpY2UoMCwgaW52Q3Vyc29yUG9zKS5jb25jYXQoaW52ZW50b3J5LnNsaWNlKGludkN1cnNvclBvcyArIDEsIGludmVudG9yeS5sZW5ndGgpKTtcclxuICAgICAgICBtb3ZlQ2hhcigwLDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0YWNrID0gKGJvb2w9ZmFsc2UpID0+e1xyXG4gICAgc2hvd0F0dGFjayA9IGJvb2wgfHwgIXNob3dBdHRhY2s7XHJcbiAgICBhdHRhY2tCbG9ja1swXSA9IGNoYXJbMF07XHJcbiAgICBhdHRhY2tCbG9ja1sxXSA9IGNoYXJbMV0rMTtcclxuICAgIG1vdmVDaGFyKDAsIDApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXR0YWNrRGlyID0gKGR4LCBkeSkgPT4ge1xyXG4gICAgYXR0YWNrQmxvY2tbMF0gPSBjaGFyWzBdICsgZHg7XHJcbiAgICBhdHRhY2tCbG9ja1sxXSA9IGNoYXJbMV0gKyBkeTtcclxuICAgIG1vdmVDaGFyKDAsMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhdHRhY2sgPSAoKSA9PiB7XHJcbiAgICBtb25zdGVyc01vdmUgPSB0cnVlO1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIC8vIGNvbnN0IGRhbWFnZSA9IChhdGtUdXJucyA+IDApID8gdXNlckFUSyArIDUwIDogdXNlckFUSztcclxuICAgICAgICBjb25zdCBuZXdIUCA9IG1vbnN0ZXJzW2F0dGFja0Jsb2NrWzBdXVthdHRhY2tCbG9ja1sxXV0udGFrZURtZyh1c2VyQVRLKTtcclxuICAgICAgICBpZiAobmV3SFAgPD0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbW9uc3RlcnNbYXR0YWNrQmxvY2tbMF1dW2F0dGFja0Jsb2NrWzFdXS5yYW5kb21Ecm9wKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBtb25zdGVyc1thdHRhY2tCbG9ja1swXV1bYXR0YWNrQmxvY2tbMV1dO1xyXG4gICAgICAgICAgICBpdGVtc1tpdGVtXS5wdXNoKFthdHRhY2tCbG9ja1swXSwgYXR0YWNrQmxvY2tbMV1dKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0b2dnbGVBdHRhY2soKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgdG9nZ2xlQXR0YWNrKCk7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5iZWdpblBhdGgoKTtcclxuICAgICAgICBnYW1lQ2FudmFzLmZvbnQgPSBcIjhweCBSb2JvdG8sIHNhbnMgc2VyaWZcIjtcclxuICAgICAgICBnYW1lQ2FudmFzLmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5maWxsVGV4dChcIldhaXRlZCBhIHR1cm5cIiwgY2hhclswXSpjRCwgY2hhclsxXSpjRCk7XHJcbiAgICAgICAgZ2FtZUNhbnZhcy5jbG9zZVBhdGgoKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5yZXN0YXJ0R2FtZSgpOyIsIlxyXG5cclxuLy8gUmFuZG9tIE51bWJlciBHZW5lcmF0b3JcclxuY29uc3Qgcm5nID0gKG51bSkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKSArIDE7XHJcblxyXG52YXIgb2N0b3B1c0lNRyA9IG5ldyBJbWFnZSgpO1xyXG5vY3RvcHVzSU1HLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3Mvb2N0b3B1c0lNRy5zdmdcIjtcclxuXHJcbnZhciBvY3RvcHVzQVRLID0gbmV3IEltYWdlKCk7XHJcbm9jdG9wdXNBVEsuc3JjID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTmVtaW5lbTEyMDMvRGFuZ2Vyb3VzbHlOb3JtYWxEdW5nZW9ucy9yZWZzL2hlYWRzL21hc3Rlci9zcmMvc3Zncy9vY3RvcHVzQVRLLnN2Z1wiO1xyXG5cclxudmFyIHZhbXBpcmVJTUcgPSBuZXcgSW1hZ2UoKTtcclxudmFtcGlyZUlNRy5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL3ZhbXBpcmUuc3ZnXCI7XHJcblxyXG52YXIgdmFtcGlyZUFUSyA9IG5ldyBJbWFnZSgpO1xyXG52YW1waXJlQVRLLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3MvVjFhbXBpcmVGYW5nLnN2Z1wiO1xyXG5cclxudmFyIHdlcmV3b2xmSU1HID0gbmV3IEltYWdlKCk7XHJcbndlcmV3b2xmSU1HLnNyYyA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05lbWluZW0xMjAzL0Rhbmdlcm91c2x5Tm9ybWFsRHVuZ2VvbnMvcmVmcy9oZWFkcy9tYXN0ZXIvc3JjL3N2Z3Mvd2VyZXdvbGYuc3ZnXCI7XHJcblxyXG52YXIgd2VyZXdvbGZBVEsgPSBuZXcgSW1hZ2UoKTtcclxud2VyZXdvbGZBVEsuc3JjID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTmVtaW5lbTEyMDMvRGFuZ2Vyb3VzbHlOb3JtYWxEdW5nZW9ucy9yZWZzL2hlYWRzL21hc3Rlci9zcmMvc3Zncy9XZXJld29sZkZhbmcuc3ZnXCI7XHJcblxyXG52YXIgcmVhcGVySU1HID0gbmV3IEltYWdlKCk7XHJcbnJlYXBlcklNRy5zcmMgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9OZW1pbmVtMTIwMy9EYW5nZXJvdXNseU5vcm1hbER1bmdlb25zL3JlZnMvaGVhZHMvbWFzdGVyL3NyYy9zdmdzL2RldmlsLnN2Z1wiO1xyXG5cclxudmFyIHJlYXBlckFUSyA9IG5ldyBJbWFnZSgpO1xyXG5yZWFwZXJBVEsuc3JjID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTmVtaW5lbTEyMDMvRGFuZ2Vyb3VzbHlOb3JtYWxEdW5nZW9ucy9yZWZzL2hlYWRzL21hc3Rlci9zcmMvc3Zncy9kZXZpbEFUSy5zdmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IodHlwZSwgeCwgeSl7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFwib1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJPY3RvcHVzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIUCA9IDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF4SFAgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJJTUcgPSBvY3RvcHVzSU1HO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQVRLID0gb2N0b3B1c0FUSztcclxuICAgICAgICAgICAgICAgIHRoaXMuZG1nID0gMTA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IFwiV2VyZXdvbGZcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhQID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhIUCA9IDE1MDtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlcklNRyA9IHdlcmV3b2xmSU1HO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQVRLID0gd2VyZXdvbGZBVEs7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRtZyA9IDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBcIlZhbXBpcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhQID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhIUCA9IDIwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlcklNRyA9IHZhbXBpcmVJTUc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJBVEsgPSB2YW1waXJlQVRLO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kbWcgPSA1MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJSZWFwZXJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhQID0gMTAwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF4SFAgPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVySU1HID0gcmVhcGVySU1HO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyQVRLID0gcmVhcGVyQVRLO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kbWcgPSA5MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gXCJVbmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIUCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1heEhQID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3RlcklNRyA9IG9jdG9wdXNJTUc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJBVEsgPSBvY3RvcHVzQVRLO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kbWcgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tYID0gbnVsbDtcclxuICAgICAgICB0aGlzLmF0dGFja1kgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW92ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlRG1nKGRtZyl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SFAgLT0gZG1nO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRIUDtcclxuICAgIH1cclxuXHJcbiAgICB0YWtlVHVybihjaGFyWCwgY2hhclkpe1xyXG4gICAgICAgIGlmKHRoaXMuYXR0YWNrWCAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8vIEF0dGFja2luZyB0aGUgY2hhcmFjdGVyIHRoaXMgdHVyblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSAvLyByZXR1cm4gdHJ1ZSBmb3IgYXR0YWNraW5nXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChjaGFyWCA9PT0gdGhpcy54ICYmIE1hdGguYWJzKGNoYXJZLXRoaXMueSkgPT09IDEpIHx8IChjaGFyWSA9PT0gdGhpcy55ICYmIE1hdGguYWJzKGNoYXJYIC0gdGhpcy54KSA9PT0gMSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tYID0gY2hhclg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja1kgPSBjaGFyWTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vTW92ZSB0aGUgbW9uc3RlciB0b3dhcmRzIHRoZSBwbGF5ZXJcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vIHJldHVybiBmYWxzZSBmb3Igbm90IGF0dGFja2luZ1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21Ecm9wKCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1Ecm9wID0gcm5nKDEwMCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMubmFtZSl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJPY3RvcHVzXCI6XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtRHJvcCA+IDcwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJIUFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJXZXJld29sZlwiOlxyXG4gICAgICAgICAgICAgICAgaWYoaXRlbURyb3AgPiA2MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiSFBcIjtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZihpdGVtRHJvcCA+IDgwKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gXCJNUFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJHXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJWYW1waXJlXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbURyb3AgPiA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIklOVlVMTlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtRHJvcCA+IDcwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQVRLXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbURyb3AgPiA1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiREVGXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXRlbURyb3AgPiAyNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiSFBcIjtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZihpdGVtRHJvcCA+IDQwKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gXCJNUFwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkdcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiUmVhcGVyXCI6XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtRHJvcCA+IDQwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJERUFUSFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGl0ZW1Ecm9wID4gMjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIklOVlVMTlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJIUFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiVW5rbm93blwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiR1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XHJcbmltcG9ydCB7IG1heEhlaWdodCwgbWF4V2lkdGgsIG1vdmVDaGFyLCB1c2VJdGVtLCBtb3ZlSW52Q3Vyc29yLCB0b2dnbGVBdHRhY2ssIGF0dGFjaywgYXR0YWNrRGlyLCB0b2dnbGVJbnZDdXJzb3IsIHRvZ2dsZVBhdXNlLCByZXN0YXJ0R2FtZSB9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZVwiOyBcclxuaW1wb3J0IHsgY0QgfSBmcm9tIFwiLi9zY3JpcHRzL2NoYXJcIjtcclxuXHJcbmxldCB1c2VJbnZDdXJzb3IgPSBmYWxzZTtcclxubGV0IHNob3dBdHRhY2sgPSBmYWxzZTtcclxubGV0IHBhdXNlZCA9IHRydWU7XHJcblxyXG5jb25zdCBrZXlkb3duUHJlc3MgPSBlID0+IHtcclxuICAgIGlmKGUua2V5ID09PSBcInJcIiB8fCBlLmtleSA9PT0gXCJSXCIpe1xyXG4gICAgICAgIHJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgc2hvd0F0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHVzZUludkN1cnNvciA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmKGUua2V5ID09PSBcIiBcIil7ZS5wcmV2ZW50RGVmYXVsdCgpO31cclxuICAgIGxldCBkeCA9IDA7XHJcbiAgICBsZXQgZHkgPSAwO1xyXG4gICAgLy8gTW92ZW1lbnRcclxuICAgIGlmIChlLmtleSA9PSBcIlJpZ2h0XCIgfHwgZS5rZXkgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcclxuICAgICAgICBkeCArPSAxO1xyXG4gICAgfSBlbHNlIGlmIChlLmtleSA9PSBcIkxlZnRcIiB8fCBlLmtleSA9PSBcIkFycm93TGVmdFwiKSB7XHJcbiAgICAgICAgZHggLT0gMTtcclxuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gXCJVcFwiIHx8IGUua2V5ID09IFwiQXJyb3dVcFwiKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGR5IC09IDFcclxuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gXCJEb3duXCIgfHwgZS5rZXkgPT0gXCJBcnJvd0Rvd25cIikge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBkeSArPSAxXHJcbiAgICB9XHJcbiAgICBpZiAoKGUua2V5ID09PSBcInpcIiB8fCBlLmtleSA9PT0gXCJaXCIpICYmICFwYXVzZWQpIHtcclxuICAgICAgICAvLyBPcGVuIEludmVudG9yeVxyXG4gICAgICAgIHVzZUludkN1cnNvciA9ICF1c2VJbnZDdXJzb3I7XHJcbiAgICAgICAgdG9nZ2xlSW52Q3Vyc29yKHVzZUludkN1cnNvcik7XHJcbiAgICB9IGVsc2UgaWYoKGUua2V5ID09PSBcInhcIiB8fCBlLmtleSA9PT0gXCJYXCIpICYmIHNob3dBdHRhY2sgJiYgIXBhdXNlZCkge1xyXG4gICAgICAgIC8vIENhbmNlbCBBdHRhY2tcclxuICAgICAgICB0b2dnbGVBdHRhY2soZmFsc2UpO1xyXG4gICAgICAgIHNob3dBdHRhY2sgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZihlLmtleSA9PT0gXCJFc2NhcGVcIiAmJiAhdXNlSW52Q3Vyc29yKXtcclxuICAgICAgICBwYXVzZWQgPSAhcGF1c2VkO1xyXG4gICAgICAgIHRvZ2dsZVBhdXNlKCk7XHJcbiAgICB9IGVsc2UgaWYoZHgrZHkgIT0gMCAmJiAhdXNlSW52Q3Vyc29yICYmICFzaG93QXR0YWNrICYmICFwYXVzZWQpe1xyXG4gICAgICAgIC8vIGlmIHRoZSBjaGFyYWN0ZXIgaGFzIG1vdmVkIGFuZCB3ZSdyZSBub3QgbW92aW5nIHRoZSBpbnZlbnRvcnkgY3Vyc29yIGFuZCB3ZSdyZSBub3QgYXR0YWNraW5nXHJcbiAgICAgICAgbW92ZUNoYXIoZHgsIGR5KTtcclxuICAgIH0gZWxzZSBpZiAoZHgrZHkgIT0gMCAmJiB1c2VJbnZDdXJzb3IgJiYgIXBhdXNlZCl7IFxyXG4gICAgICAgIC8vIHVzZUludkN1cnNvciA9PT0gdHJ1ZSA9PiBtb3ZlIHRoZSBpbnZlbnRvcnkgY3Vyc29yXHJcbiAgICAgICAgbW92ZUludkN1cnNvcihkeCwgZHkpO1xyXG4gICAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCIgXCIgJiYgdXNlSW52Q3Vyc29yICYmICFwYXVzZWQpeyBcclxuICAgICAgICAvLyBVc2UgSXRlbSBpbiBpbnZlbnRvcnlcclxuICAgICAgICB1c2VJdGVtKCk7XHJcbiAgICB9IGVsc2UgaWYoZHgrZHkgIT0gMCAmJiBzaG93QXR0YWNrICYmICFwYXVzZWQpe1xyXG4gICAgICAgIGF0dGFja0RpcihkeCwgZHkpO1xyXG4gICAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCIgXCIgJiYgIXVzZUludkN1cnNvciAmJiAhcGF1c2VkKXtcclxuICAgICAgICAvLyBBdHRhY2tcclxuICAgICAgICBpZihzaG93QXR0YWNrKXtcclxuICAgICAgICAgICAgYXR0YWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9nZ2xlQXR0YWNrKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaG93QXR0YWNrID0gIXNob3dBdHRhY2tcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQ2FudmFzXCIpO1xyXG4vLyBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDEwO1xyXG4vLyBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gMjA7XHJcbi8vIFNldCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiBjYW52YXNcclxuY2FudmFzLndpZHRoID0gbWF4V2lkdGggKiBjRCArIDMwMDtcclxuY2FudmFzLmhlaWdodCA9IG1heEhlaWdodCAqIGNEO1xyXG4vLyBtb3ZlQ2hhciByZW5kZXJzIHRoZSBjaGFyYWN0ZXIgd2l0aG91dCBtb3ZpbmcgaXRcclxuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBtb3ZlQ2hhcigwLCAwKVxyXG4gICAgdG9nZ2xlUGF1c2UoKTtcclxufSwgMTAwKVxyXG5jb25zb2xlLmxvZyhcIkdhbWUgTG9hZGVkXCIpO1xyXG4vLyBUaGlzIHdpbGwgYWxsb3cgdXMgdG8gbW92ZSB0aGUgY2hhcmFjdGVyXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleWRvd25QcmVzcywgZmFsc2UpO1xyXG4iXSwibmFtZXMiOlsiZmxvb3JCR0NvbG9yIiwicGxheWVySW1nIiwiSW1hZ2UiLCJzcmMiLCJjRCIsInN0YXJ0WCIsInN0YXJ0WSIsIngiLCJ5IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNoYXIiLCJnZXRDb250ZXh0IiwicmVuZGVyQ2hhciIsIm5ld1giLCJuZXdZIiwiYmVnaW5QYXRoIiwiZmlsbFN0eWxlIiwiZmlsbCIsImRyYXdJbWFnZSIsImNsb3NlUGF0aCIsIk1vbnN0ZXIiLCJybmciLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnb2xkQmFyIiwid2FsbCIsImRvb3IiLCJsb2NrZWREb29yIiwiaGVhbHRoUG90aW9uIiwibWFuYVBvdGlvbiIsImF0a1BvdGlvbiIsImRlZlBvdGlvbiIsImludnVsblBvdGlvbiIsImRlYXRoUG90aW9uIiwic3dvcmQiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsImludlhDb29yZCIsImludllDb29yZCIsImludldpZHRoIiwiaW52SGVpZ2h0Iiwic2hvd0ludkN1cnNvciIsImludkN1cnNvclgiLCJpbnZDdXJzb3JZIiwiaW52Q3Vyc29yUG9zIiwiaHBYQ29vcmQiLCJocFlDb29yZCIsImhwSGVpZ2h0IiwiaXRlbXMiLCJtb25zdGVycyIsInByZXZSb29tRnVuYyIsInByZXZSb29tIiwibmV3Um9vbSIsImkiLCJtb25zdGVyTnVtIiwibG9nIiwibW9uc3RlclR5cGUiLCJyZXN0YXJ0R2FtZSIsImdvbGRDb3VudCIsImludmVudG9yeSIsImN1cnJlbnRIUCIsIm1heEhQIiwiY3VycmVudE1QIiwibWF4TVAiLCJ1c2VyQVRLIiwidXNlckRlZiIsImF0a1R1cm5zIiwiZGVmVHVybnMiLCJpbnZ1bG5UdXJucyIsInNob3dBdHRhY2siLCJhdHRhY2tCbG9jayIsIm1vbnN0ZXJzTW92ZSIsImdhbWVPdmVyIiwic2hvd0NvbnRyb2xzIiwibW92ZUNoYXIiLCJnYW1lQ2FudmFzIiwidG9nZ2xlUGF1c2UiLCJkeCIsImR5Iiwid2luZG93IiwibW9uc3RlckJsb2NrIiwiT2JqZWN0IiwidmFsdWVzIiwiZm9yRWFjaCIsInJvdyIsIm1vbnN0ZXIiLCJtb3ZlZFJvb20iLCJtb3ZlZCIsIm1vbnN0ZXJUdXJuIiwidGFrZVR1cm4iLCJhdHRhY2tYIiwiYXR0YWNrWSIsImRtZyIsImR4TW9uIiwiZHlNb24iLCJkeE1vbk5vcm0iLCJhYnMiLCJkeU1vbk5vcm0iLCJuZXdNb25YIiwibmV3TW9uWSIsImNhbk1vdmVYIiwiY2FuTW92ZVkiLCJ1bmRlZmluZWQiLCJ0ZW1wTW9uIiwiZ2xvYmFsQWxwaGEiLCJyZWN0IiwiZm9udCIsImZpbGxUZXh0IiwiY2xlYXJSZWN0IiwiaiIsImNvbnNvbGUiLCJrZXlzIiwiaXRlbU5hbWUiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJjb25jYXQiLCJtb25zdGVySU1HIiwibW9uc3RlckFUSyIsInN0cm9rZVN0eWxlIiwic3Ryb2tlIiwidG9nZ2xlSW52Q3Vyc29yIiwiYm9vbCIsIm1vdmVJbnZDdXJzb3IiLCJuZXdDdXJzb3JYIiwibmV3Q3Vyc29yWSIsInVzZUl0ZW0iLCJ0b2dnbGVBdHRhY2siLCJhdHRhY2tEaXIiLCJhdHRhY2siLCJuZXdIUCIsInRha2VEbWciLCJpdGVtIiwicmFuZG9tRHJvcCIsImVyciIsIm9jdG9wdXNJTUciLCJvY3RvcHVzQVRLIiwidmFtcGlyZUlNRyIsInZhbXBpcmVBVEsiLCJ3ZXJld29sZklNRyIsIndlcmV3b2xmQVRLIiwicmVhcGVySU1HIiwicmVhcGVyQVRLIiwiY29uc3RydWN0b3IiLCJ0eXBlIiwibmFtZSIsImNoYXJYIiwiY2hhclkiLCJpdGVtRHJvcCIsInVzZUludkN1cnNvciIsInBhdXNlZCIsImtleWRvd25QcmVzcyIsImUiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiXSwic291cmNlUm9vdCI6IiJ9