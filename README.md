# DangerouslyNormalDungeons

![Website Screenshot](https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/master/DungeonCrawlerSS.png)

# Features
## Movement
Character and Monsters have movement. You can use arrow keys to move the character around.

You can walk through the doors to go to another room. (Rooms are currently not saved so going back and forth would create random rooms)

## Random Room Generator
Everytime you enter a door, a new room gets randomly generated. Right now, monsters are the only thing generated.
In the future, we will randomly generate treasure chests, have more monster types, and maybe have stairs to go to next floor.

## Inventory
You can use items in your inventory. Z to tooggle inventory. Spacebar to use the items that you're hovering over.

## Items
You can pick up items by running over them. There are Health Potions, Mana Potions, and Gold.

## Attack
You can attack the enemies by first prepping an attack with spacebar then pressing spacebar to attack.

If you press attack on an empty slot, you will wait a turn.

## Healthbar
Keep your health greater than 0 while lowering your enemies health. Enemies health shows up when they get hit.

# Code Snippet
## [Main Game File](https://github.com/Neminem1203/DangerouslyNormalDungeons/blob/master/src/scripts/game.js)
### Monster Movement
```javascript
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
if (rng(100) < 50) {
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
```
This code snippet was one of the most difficult parts of the project. I had to think of how to move the enemy based on where the
 player is and whether there is another enemy blocking the way.

```javascript
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
```
I created this code to help move the inventory cursor. The logic was pretty difficult because I had to move the x and y position of the
 cursor while also changing the inventory index to use the correct item when useItem is invoked.
