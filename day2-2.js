const fs = require("fs");

const data = fs.readFileSync("input/day2.txt", { encoding: "utf-8" });
const input = data.split("\r\n");
// x lose, y draw, z win
// A rock B paper C scissor
let sum = 0;

input.forEach((line) => {
	if (line[2] === "X") {
		// you need to loose

		if (line[0] === "A") sum += InputPoint("Z");
		if (line[0] === "B") sum += InputPoint("X");
		if (line[0] === "C") sum += InputPoint("Y");
	} else if (line[2] === "Y") {
		// you need to draw
		sum += 3;
		if (line[0] === "A") sum += InputPoint("X");
		if (line[0] === "B") sum += InputPoint("Y");
		if (line[0] === "C") sum += InputPoint("Z");
	} else if (line[2] === "Z") {
		// you need to win
		sum += 6;
		if (line[0] === "A") sum += InputPoint("Y");
		if (line[0] === "B") sum += InputPoint("Z");
		if (line[0] === "C") sum += InputPoint("X");
	}
	console.log(sum);
});
console.log(sum);

function InputPoint(element) {
	// X is rock
	if (element === "X") return 1;
	// Y is paper
	if (element === "Y") return 2;
	// z is scissor
	if (element === "Z") return 3;
}
