const fs = require("fs");

const input = fs.readFileSync("input/day9temp.txt", { encoding: "utf-8" });

const data = input.split("\r\n");
let map = new Array(new Array(), new Array());
let tailX = 0,
	tailY = 0;
let headX = 0,
	headY = 0;
data.forEach(mainProgram);

function mainProgram(line) {
	let dir = line[0];
	let dirLen = Number(line.slice(2));
	console.log(dir, dirLen);
}
