import "./styles/index.scss";
import { maxHeight, maxWidth, moveChar, useItem, moveInvCursor, toggleAttack, attack, attackDir, toggleInvCursor, togglePause, restartGame } from "./scripts/game"; 
import { cD } from "./scripts/char";

let useInvCursor = false;
let showAttack = false;
let paused = true;

const keydownPress = e => {
    if(e.key === "r" || e.key === "R"){
        restartGame();
        paused = false;
        showAttack = false;
        useInvCursor = false;
        return;
    }
    if(e.key === " "){e.preventDefault();}
    let dx = 0;
    let dy = 0;
    // Movement
    if (e.key == "Right" || e.key == "ArrowRight") {
        dx += 1;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        dx -= 1;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        e.preventDefault();
        dy -= 1
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        e.preventDefault();
        dy += 1
    }
    if ((e.key === "z" || e.key === "Z") && !paused) {
        // Open Inventory
        useInvCursor = !useInvCursor;
        toggleInvCursor(useInvCursor);
    } else if((e.key === "x" || e.key === "X") && showAttack && !paused) {
        // Cancel Attack
        toggleAttack(false);
        showAttack = false;
    } else if(e.key === "Escape" && !useInvCursor){
        paused = !paused;
        togglePause();
    } else if(dx+dy != 0 && !useInvCursor && !showAttack && !paused){
        // if the character has moved and we're not moving the inventory cursor and we're not attacking
        moveChar(dx, dy);
    } else if (dx+dy != 0 && useInvCursor && !paused){ 
        // useInvCursor === true => move the inventory cursor
        moveInvCursor(dx, dy);
    } else if (e.key === " " && useInvCursor && !paused){ 
        // Use Item in inventory
        useItem();
    } else if(dx+dy != 0 && showAttack && !paused){
        attackDir(dx, dy);
    } else if (e.key === " " && !useInvCursor && !paused){
        // Attack
        if(showAttack){
            attack();
        } else {
            toggleAttack(true);
        }
        showAttack = !showAttack
    }
}

const canvas = document.getElementById("gameCanvas");
// canvas.width = window.innerWidth - 10;
// canvas.height = window.innerHeight - 20;
// Set the width and height of canvas
canvas.width = maxWidth * cD + 300;
canvas.height = maxHeight * cD;
// moveChar renders the character without moving it
setTimeout(() => {
    moveChar(0, 0)
    togglePause();
}, 100)
console.log("Game Loaded");
// This will allow us to move the character
document.addEventListener("keydown", keydownPress, false);
