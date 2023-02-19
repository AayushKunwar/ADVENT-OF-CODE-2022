const fs = require("fs");

const data = fs.readFileSync("input/day12.txt", { encoding: "utf-8" });

let input = data.split("\r\n");

let charMap = new Map();
let startPosMain = 0;
let endPos = 0;
input.forEach((line, indxi) => {
	[...line].forEach((charac, indxj) => {
		charMap.set(`${indxj},${indxi}`, charac);
		if (charac == "S") startPosMain = `${indxj},${indxi}`;
		else if (charac == "E") endPos = `${indxj},${indxi}`;
	});
});
let height = input.length;
let width = input[0].length;
let dist = new Map();
let unexplored = new Map();

function setup(startPos) {
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			dist.set(`${j},${i}`, 99999);
			unexplored.set(`${j},${i}`, false);
		}
	}
	dist.set(startPos, 0);
	charMap.set(endPos, "z");
}
setup(startPosMain);
main(startPosMain);
// printDist();
console.log("Part1");
console.log(dist.get(endPos));

function main(startPos) {
	getNeighbour(startPos).forEach((neigh) => {
		updateDist(startPos, neigh);
	});
	unexplored.delete(startPos);
	while (dist.get(endPos) == 99999) {
		let tempNode = getNextNode();
		if (tempNode == "skip this") return;
		// console.log("updating " + tempNode);
		// console.log(getNeighbour(tempNode) + " are the neighbours");
		updateDist(tempNode);
		getNeighbour(tempNode).forEach((neigh) => {
			updateDist(tempNode, neigh);
		});
		unexplored.delete(tempNode);
	}
}
function getNeighbour(pos) {
	let ans = [];
	let [x, y] = pos.match(/\d+/g);
	x = Number(x);
	y = Number(y);
	// console.log(x, y, "at the get neighbour function");
	let currCharac = charMap.get(pos);
	if (currCharac == "S") currCharac = "a";

	if (x - 1 >= 0 && oneDiff(currCharac, charMap.get(`${x - 1},${y}`))) {
		ans.push(`${x - 1},${y}`);
	}
	if (y - 1 >= 0 && oneDiff(currCharac, charMap.get(`${x},${y - 1}`))) {
		ans.push(`${x},${y - 1}`);
	}
	if (x + 1 <= width && oneDiff(currCharac, charMap.get(`${x + 1},${y}`))) {
		ans.push(`${x + 1},${y}`);
	}
	if (y + 1 <= height && oneDiff(currCharac, charMap.get(`${x},${y + 1}`))) {
		ans.push(`${x},${y + 1}`);
	}
	return ans;
}
function oneDiff(one, two) {
	if (two == undefined) return false;
	if (one == two) return true;
	if (two.charCodeAt(0) - one.charCodeAt(0) <= 1) return true;
	return false;
}
function getNextNode() {
	let low = Infinity;
	let currNode;
	for ([key, value] of unexplored.entries()) {
		if (value) continue;
		if (low > dist.get(key)) {
			low = dist.get(key);
			currNode = key;
		}
	}
	if (currNode == undefined) {
		console.log("something went wrong boii");
		// printDist();
		console.log(dist.get(endPos));
		return "skip this";
		process.exit(1);
	}
	return currNode;
}
function updateDist(curr, next) {
	let currDist = dist.get(curr);
	let nextDist = dist.get(next);

	if (nextDist > currDist + 1) {
		dist.set(next, currDist + 1);
	}
}
function printDist() {
	for (i = 0; i < height; i++) {
		let line = "";
		for (j = 0; j < width; j++) {
			line += dist.get(`${j},${i}`);
			line += "\t";
		}
		console.log(line);
	}
}
