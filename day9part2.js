// It dont work
const fs = require("fs");

const input = fs.readFileSync("input/day9temp.txt", { encoding: "utf-8" });

const data = input.split("\r\n");
let mapPart1 = new Set();
let mapPart2 = new Set();
let nodeLen = 10;
let arr = [];

for (let i = 0; i < nodeLen; i++) {
	arr.push([0, 0]);
}
const direc = {
	U: [1, 0],
	D: [-1, 0],
	L: [0, -1],
	R: [0, 1],
};
data.forEach(mainProgram);
console.log(mapPart1.size);
console.log(mapPart2.entries());

function mainProgram(line) {
	let dir = line[0];
	let dirLen = Number(line.slice(2));
	for (let i = 0; i < dirLen; i++) {
		arr[0] = [arr[0][0] + direc[dir][0], arr[0][1] + direc[dir][1]];
		console.log(arr);
		updateNextNode(arr[1], 1);
	}
}

function updateNextNode(node, index) {
	if (index > 9) {
		return;
	}
	if (arentTouching(index)) {
		//console.log(`value at ${index} is changed`);
		let [dx, dy] = direc2head(node);
		node[0] += dx;
		node[1] += dy;
	}

	if (index == 1) mapPart1.add(`${arr[1]}`);
	//console.log(`head is at${arr[0]}`);
	//console.log(arentTouching(index));
	if (index == 9) mapPart2.add(`${arr[9][0]},${arr[9][1]}`);
	index++;
	updateNextNode(arr[index], index);
}
function direc2head(node) {
	dx = arr[0][0] - node[0];
	dy = arr[0][1] - node[1];
	dx = Math.abs(dx) > 1 ? dx / Math.abs(dx) : 0;
	dy = Math.abs(dy) > 1 ? dy / Math.abs(dy) : 0;
	return [dx, dy];
}
function arentTouching(index) {
	dx = arr[index][0] - arr[index - 1][0];
	if (Math.abs(dx) > 1) return true;

	dy = arr[index][1] - arr[index - 1][1];
	if (Math.abs(dy) > 1) return true;

	return false;
}
