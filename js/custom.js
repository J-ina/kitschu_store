// mouse cursor change
const docE = document.documentElement;
const banner = document.querySelector(".carousel-inner");
const new_cursor = document.querySelector("#cursor");
let posX = 0;
let posY = 0;

document.addEventListener('DOMContentLoaded', () => {
  banner.onmousemove = function (e) {
    posX = e.clientX + 15 + "px";
    posY = e.clientY + 15 + "px";
    new_cursor.style.left = posX;
    new_cursor.style.top = posY;
  }
})