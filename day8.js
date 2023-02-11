const fs = require("fs");

var apple = 12;
const data = fs.readFileSync("input/day8.txt", { encoding: "utf-8" });

const input = data.split("\r\n");
let actHeight = input.length;
let actWidth = input[0].length;

//console.log(width, height);
let edgeCount =
	input.length * input[0].length - (input.length - 2) * (input[0].length - 2);

//console.log(edgeCount);

let part2 = [];

// loop over every row and column
let visibleCounter = 0;
//let part2answer;
input.forEach((line, i) => {
	line.split("").forEach((number, j) => {
		if (i == actHeight - 1 || i == 0 || j == 0 || j == actWidth - 1) return;
		if (isHidden(number, i, j) == 0) {
			visibleCounter++;
		}
		//console.log(countScenery(number, i, j));
		part2.push(countScenery(number, i, j));
		//part2answer = part2.reduce((a, b) => {
		//	return a > b ? a : b;
		//}, part2[0]);
		//console.log(number, i, j);
	});
});

console.log(visibleCounter + edgeCount);
console.log("for part2");
//console.log(part2answer);
console.log(Math.max(...part2));

function isHidden(value, i, j) {
	// check sideways
	let left = 0,
		right = 0,
		up = 0,
		down = 0;
	//prolly change this to one filter and one if statement, much shorter
	input[i]
		.split("")
		.filter((x, index) => {
			return index < j;
		})
		.forEach((x) => {
			if (Number(x) >= Number(value)) {
				//console.log("checking left" + value + " with " + x);
				left = 1;
			}
		});
	//right
	input[i]
		.split("")
		.filter((x, index) => {
			return index > j;
		})
		.forEach((x) => {
			if (Number(x) >= Number(value)) {
				//console.log("checking right" + value + " with " + x);
				right = 1;
			}
		});
	// checking up
	input
		.filter((x, index) => {
			return index < i;
		})
		.forEach((subinput) => {
			if (Number(subinput[j]) >= Number(value)) {
				//console.log("checking up" + value + " with " + subinput[j]);
				up = 1;
			}
		});
	// checking down
	input
		.filter((x, index) => {
			return index > i;
		})
		.forEach((subinput) => {
			if (Number(subinput[j]) >= Number(value)) {
				//console.log("checking " + value + " with " + subinput[j]);
				down = 1;
			}
		});
	//console.log(left, right, up, down);
	return left && right && up && down;
}
function countScenery(value, i, j) {
	// check sideways
	let left = 0,
		right = 0,
		up = 0,
		down = 0;
	//checking left
	//console.log(`for left ${value} at ${i} and ${j}`);
	for (let index = j - 1; index >= 0; index--) {
		left++;
		if (Number(input[i][index] >= Number(value))) break;
	}
	//checking right
	//console.log(`for right ${value} at ${i} and ${j}`);
	for (let index = j + 1; index <= input[i].length - 1; index++) {
		right++;
		if (Number(input[i][index] >= Number(value))) break;
	}
	//checking up
	//console.log(`for up ${value} at ${i} and ${j}`);
	for (let index = i - 1; index >= 0; index--) {
		up++;
		if (Number(input[index][j] >= Number(value))) break;
	}
	//console.log(`for down ${value} at ${i} and ${j}`);
	for (let index = i + 1; index <= input.length - 1; index++) {
		down++;
		if (Number(input[index][j] >= Number(value))) break;
		//console.log(input[index][j], value, down);
	}
	//console.log(up, left, down, right);
	return up * down * left * right;
}
