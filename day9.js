const fs = require("fs");

const input = fs.readFileSync("input/day9temp.txt", { encoding: "utf-8" });

const data = input.split("\r\n");
let mapPart1 = new Set();
let mapPart2 = new Set();

class Node {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

let arr = new Array(10).fill().map(() => {
	return new Node();
});

data.forEach(mainProgram);
console.log(mapPart1.size);
console.log(mapPart2.size);

function mainProgram(line) {
	let dir = line[0];
	let dirLen = Number(line.slice(2));
	for (let i = 0; i < dirLen; i++) {
		updateHead(dir);
	}
}

function updateHead(dir) {
	if (dir == "L") {
		arr[0].x--;
	} else if (dir == "R") {
		arr[0].x++;
	} else if (dir == "U") {
		arr[0].y++;
	} else if (dir == "D") {
		arr[0].y--;
	}
	console.log(`head is at ${arr[0].x} and ${arr[0].y} with ${dir}`);
	for (let i = 1; i < 10; i++) {
		updateNextNode(i);
		console.log(`${i} is at ${arr[i].x}, ${arr[i].y}`);
	}
}

function updateNextNode(index) {
	let [distX, distY] = dist2head(index);
	if (arentTouching(index)) {
		arr[index].x -= Math.sign(distX);
		arr[index].y -= Math.sign(distY);
	}
	if (index == 1) mapPart1.add(`${arr[1].x},${arr[1].y}`);
	if (index == 9) mapPart2.add(`${arr[9].x},${arr[9].y}`);
}
function dist2head(index) {
	let distX = arr[index].x - arr[0].x;
	let distY = arr[index].y - arr[0].y;

	return [distX, distY];
}
function arentTouching(index) {
	let dist = Math.sqrt(
		Math.pow(arr[index].x - arr[index - 1].x, 2) +
			Math.pow(arr[index].y - arr[index - 1].y, 2)
	);
	// let dx = arr[index].x - arr[index - 1].x;
	// let dy = arr[index].y - arr[index - 1].y;

	// dist = Math.abs(dx) + Math.abs(dy);

	if (dist > 1.5) return true;
	return false;
}
