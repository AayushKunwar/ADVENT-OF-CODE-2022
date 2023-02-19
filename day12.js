const fs = require("fs");

const data = fs.readFileSync("input/day12temp.txt", { encoding: "utf-8" });

let input = data.split("\r\n");

// console.log(input);
let dist = new Map();
let charMap = new Map();
let startPos = 0;
let endPos = 0;
input.forEach((line, indxi) => {
	// console.log(line);
	[...line].forEach((charac, indxj) => {
		charMap.set(`${indxj},${indxi}`, charac);
		if (charac == "S") startPos = `${indxj},${indxi}`;
		else if (charac == "E") endPos = `${indxj},${indxi}`;
	});
});

let height = input.length;
let width = input[0].length;

let unexplored = new Map();
// store the node map with Inf distance;
for (let i = 0; i < height; i++) {
	for (let j = 0; j < width; j++) {
		dist.set(`${j},${i}`, Infinity);
		unexplored.set(`${j},${i}`, false);
	}
}
dist.set(startPos, 0);
// console.log(b);
// store the unexplored nodes

// console.log(b.keys());

// find the lowest unexplored node;

// update the unexplored nodes
// loop untill the E noded is found
main();
printDist();
console.log("is this it?");
console.log(dist.get(endPos));

function main() {
	getNeighbour(startPos).forEach((neigh) => {
		updateDist(startPos, neigh);
	});
	unexplored.delete(startPos);
	while (dist.get(endPos) == Infinity) {
		let tempNode = getNextNode();
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
	if (one == "S") one = "a";
	if (two == "E") two = "z";
	if (one == two) return true;
	if (
		one.charCodeAt(0) < two.charCodeAt(0) &&
		two.charCodeAt(0) - one.charCodeAt(0) == 1
	)
		return true;

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
		// console.log(unexplored);
		printDist();
		console.log(dist.get(endPos));
		process.exit(1);
	}
	return currNode;
}
function updateDist(curr, next) {
	let currDist = dist.get(curr);
	let nextDist = dist.get(next);

	if (nextDist > currDist) {
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
