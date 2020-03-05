import "./styles/index.scss";
import { maxHeight, maxWidth, moveChar, useItem, moveInvCursor, toggleAttack, attack, attackDir, toggleInvCursor } from "./scripts/game"; 
import { cD } from "./scripts/char";

let useInvCursor = false;
let showAttack = false;

const keydownPress = e => {
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

    if (e.key === "z" || e.key === "Z") {
        // Open Inventory
        useInvCursor = !useInvCursor;
        toggleInvCursor(useInvCursor);
    } else if((e.key === "x" || e.key === "X") && showAttack) {
        // Cancel Attack
        toggleAttack(false);
        showAttack = false;
    } else if(dx+dy != 0 && !useInvCursor && !showAttack){
        // if the character has moved and we're not moving the inventory cursor and we're not attacking
        moveChar(dx, dy);
    } else if (dx+dy != 0 && useInvCursor){ 
        // useInvCursor === true => move the inventory cursor
        moveInvCursor(dx, dy);
    } else if (e.key === " " && useInvCursor){ 
        // Use Item in inventory
        useItem();
    } else if(dx+dy != 0 && showAttack){
        attackDir(dx, dy);
    } else if (e.key === " " && !useInvCursor){
        // Attack
        if(showAttack){
            attack();
        } else {
            toggleAttack(true);
        }
        showAttack = !showAttack
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    // canvas.width = window.innerWidth - 10;
    // canvas.height = window.innerHeight - 20;
    // Set the width and height of canvas
    canvas.width = maxWidth * cD + 300;
    canvas.height = maxHeight * cD;
    // moveChar renders the character without moving it
    moveChar(0,0);
    // This will allow us to move the character
    document.addEventListener("keydown", keydownPress, false);
});

