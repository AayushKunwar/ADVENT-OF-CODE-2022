const fs = require("fs");

const input = fs.readFileSync("input/day10.txt", { encoding: "utf-8" });

const data = input.split("\r\n");
let cycle = 0;
let x = 1;
let ans = 0;

let screen = "";
let screenPtr = 1;
let spritePos = 0;
let tempCoord = 0;
data.forEach(main);
console.log(ans);
drawScreen();

function main(line) {
	if (line === "noop") {
		count(1, 0);
	} else {
		let temp = Number(line.slice(4));
		count(1, 0);
		count(1, temp);
	}
}

function count(nop, xer) {
	cycle += nop;
	if (
		cycle == 20 ||
		cycle == 60 ||
		cycle == 100 ||
		cycle == 140 ||
		cycle == 180 ||
		cycle == 220
	) {
		console.log(`cycle:${cycle} x:${x} product ${cycle * x}`);
		ans += cycle * x;
	}
	drawCalc();
	console.log(
		`cycle${cycle} x:${x} screenPtr:${screenPtr - 1} spritePos:${spritePos}`
	);
	x += xer;
	spritePos = x;
}
function drawCalc() {
	if (
		spritePos == screenPtr ||
		spritePos + 1 == screenPtr ||
		spritePos + 2 == screenPtr
	) {
		screen += "#";
	} else {
		screen += ".";
	}
	screenPtr++;
	screenPtr %= 40;
}

function drawScreen() {
	if (screen[tempCoord + 39] == undefined) return;

	console.log(screen.slice(tempCoord, tempCoord + 40));
	tempCoord += 40;
	drawScreen();
}
