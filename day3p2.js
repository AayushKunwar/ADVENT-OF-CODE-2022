// day 3 part 2
const fs = require("fs");
const { listenerCount } = require("process");

const data = fs.readFileSync("input/day3.txt", { encoding: "utf-8" });
const input = data.split("\r\n");

var sum = 0;

for (let i = 0; i < input.length; i += 3) {
	let line1 = input[i];
	let line2 = new Set(input[i + 1]);
	let line3 = new Set(input[i + 2]);

	//for (let x of line1) {
	//	if (line2.has(x) && line3.has(x)) {
	//		adder(x);
	//		break;
	//	}
	//}

	let common = [...line1].find((x) => line2.has(x) && line3.has(x));
	[common].map(adder);
}
console.log(sum);

function adder(char) {
	let num = char.charCodeAt(0);
	if (num >= 97 && num <= 122) {
		sum += num - 97 + 1;
	} else if (num >= 65 && num <= 132) {
		sum += num - 65 + 27;
	}
}
