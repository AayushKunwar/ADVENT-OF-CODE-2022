const fs = require("fs");

const data = fs.readFileSync("input/day4.txt", { encoding: "utf-8" });

const input = data.split("\r\n");
let count = 0;

let reduced = input.map(fcontain).reduce((a, b) => {
	return a + b;
});
console.log(reduced);

function fcontain(item) {
	let [part1, part2] = item.split(",");
	let [a, b] = part1.split("-");
	let [c, d] = part2.split("-");
	a = Number(a);
	b = Number(b);
	c = Number(c);
	d = Number(d);
	if (a <= c && d <= b) {
		//console.log(item + "yes yes1");
		return 1;
	}
	if (a >= c && d >= b) {
		//console.log(item + "yes yes");
		//console.log(a, b, c, d);
		//console.log(typeof a);
		return 1;
	}

	//console.log(item + "not");
	return 0;
}

function overlapp(line) {
	let [part1, part2] = line.split(",");
	let [a, b] = part1.split("-");
	let [c, d] = part2.split("-");
	a = Number(a);
	b = Number(b);
	c = Number(c);
	d = Number(d);
	if (a <= c && b >= c) return 1;
	if (a <= d && b >= d) return 1;
	if (c >= a && c <= b) return 1;
	if (d >= a && d <= b) return 1;
	if (a <= c && d <= b) {
		return 1;
	}
	if (a >= c && d >= b) {
		return 1;
	}
	console.log(a, b, c, d);
	return 0;
}
let arr2 = input.map(overlapp);
console.log(arr2);

arr2 = arr2.reduce((a, b) => {
	return a + b;
});
console.log(arr2);
