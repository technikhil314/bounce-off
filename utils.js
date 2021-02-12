export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomColor() {
    return `rgb(${getRandomInt(50, 256)},${getRandomInt(50, 256)},${getRandomInt(50, 256)})`;
}