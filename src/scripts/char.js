

var playerImg = new Image();
playerImg.src = "https://image.flaticon.com/icons/svg/2328/2328493.svg";

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
    char.clearRect(x * cD, y * cD, cD, cD);
    char.clearRect(newX * cD, newY * cD, cD, cD);
    char.drawImage(playerImg, newX * cD, newY * cD, cD, cD);


    x = newX;
    y = newY;
    char.globalAlpha = 1;
    char.closePath(); 
}