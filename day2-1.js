// A Rock, B Paper, C Scissors
// X , Y, Z
// 1 Rock, 2 Paper, 3 Scissor
// 0 lost, 3 draw, 6 won

const fs = require("fs");

fs.readFile("input/day2.txt", "utf-8", (err, data) => {
	if (err) throw err;
	const input = data.split("\r\n");

	let sum = 0;

	input.forEach((element) => {
		sum += InputPoint(element);
		sum += GamePoint(element);
	});

	console.log(sum);
});

function InputPoint(element) {
	if (element[2] === "X") return 1;

	if (element[2] === "Y") return 2;

	if (element[2] === "Z") return 3;
}
function GamePoint(element) {
	if (element[0] === "A" && element[2] === "X") return 3;
	if (element[0] === "B" && element[2] === "Y") return 3;
	if (element[0] === "C" && element[2] === "Z") return 3;

	if (element[0] === "A") {
		if (element[2] === "Y") return 6;
		if (element[2] === "Z") return 0;
	}
	if (element[0] === "B") {
		if (element[2] === "X") return 0;
		if (element[2] === "Z") return 6;
	}
	if (element[0] === "C") {
		if (element[2] === "X") return 6;
		if (element[2] === "Y") return 0;
	}
}
