import draw from "./draw.js";
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    draw(canvas, ctx);
});