import {floorBGColor} from "./game";


var playerImg = new Image();
playerImg.src = "https://raw.githubusercontent.com/Neminem1203/DangerouslyNormalDungeons/df582b78d4eb8443bbd96f4dd612da2b76d78604/src/svgs/character.svg";

export let cD = 50; // character dimension
// Players starting position
export const startX = 9;
export const startY = 5;

let x = cD * startX;
let y = cD * startY;


const canvas = document.getElementById("gameCanvas");
const char = canvas.getContext("2d");

export function renderChar(newX, newY) {
    char.beginPath();
    char.fillStyle = floorBGColor;
    // char.rect(x * cD, y * cD, cD, cD);
    // char.rect(newX * cD, newY * cD, cD, cD);
    char.fill();
    char.drawImage(playerImg, newX * cD, newY * cD, cD, cD);


    x = newX;
    y = newY;
    char.closePath(); 
}