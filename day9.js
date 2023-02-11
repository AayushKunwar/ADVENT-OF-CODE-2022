const fs = require("fs");

const input = fs.readFileSync("input/day9.txt", { encoding: "utf-8" });

const data = input.split("\r\n");
let map = new Set();
let tailX = 0,
	tailY = 0;
let headX = 0,
	headY = 0;

data.forEach(mainProgram);
console.log(map.size);

function mainProgram(line) {
	let dir = line[0];
	let dirLen = Number(line.slice(2));
	for (let i = 0; i < dirLen; i++) {
		updateHead(dir);
	}
}

function updateHead(dir) {
	let posx = headX,
		posy = headY;
	if (dir == "L") {
		headX--;
	} else if (dir == "R") {
		headX++;
	} else if (dir == "U") {
		headY++;
	} else if (dir == "D") {
		headY--;
	}

	updateTail(posx, posy);
}

function updateTail(posx, posy) {
	let dist = Math.sqrt(
		Math.pow(headX - tailX, 2) + Math.pow(headY - tailY, 2)
	);

	if (dist >= 1.5) {
		tailX = posx;
		tailY = posy;
	}
	map.add(`${tailX},${tailY}`);
}
