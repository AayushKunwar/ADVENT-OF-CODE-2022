const fs = require("fs");

const data = fs.readFileSync("input/day6.txt", { encoding: "utf-8" });

const input = data.split("");
console.log(input);

for (let i = 1; i < input.length - 3; i++) {
	let check = data.substring(i, i + 14);
	if (isUnique(check)) {
		console.log(i + 14);
		return;
	}
}
function isUnique(str) {
	string = str.split("");
	string = new Set(string);
	string = [...string].join("");

	return str === string;
}
