const fs = require("fs");
const { monitorEventLoopDelay } = require("perf_hooks");

const data = fs.readFileSync("input/day5.txt", { encoding: "utf-8" });

const input = data.split("\r\n");
//console.log(input);

let moveSet = input.splice(input.indexOf("") + 1);
//console.log(input);

input.pop();
let crate = input.pop();

crate = Number(crate.charAt(crate.length - 2));
//console.log(crate);

let cleaned = input.map(cleanup);
//console.log(cleaned);

function cleanup(str) {
	let newStr = "";
	for (let i = 0; i < crate; i++) {
		newStr += str.charAt(4 * i + 1);
	}
	return newStr;
}
let crateArr = Array(crate).fill("");
cleaned.forEach((str) => {
	for (let i in str) {
		if (str.charAt(i) === " ") continue;
		crateArr[i] += str.charAt(i);
		//	console.log(i, str.charAt(i));
	}
});
crateArr.forEach((x) => {
	crateArr[crateArr.indexOf(x)] = x.split("");
});
//console.log(crateArr);

moveSet.forEach((line) => {
	let part1, part2;
	[part1, part2] = line.split(" from ");
	//let movAmnt = part1.match(/\d\d/g);
	let [temp, movAmnt] = part1.split("move ");
	[part1, part2] = part2.split(" to ");
	let origin = part1;
	let dest = part2;

	movAmnt = Number(movAmnt);
	origin = Number(origin - 1);
	dest = Number(dest - 1);
	//console.log("this: ", movAmnt, origin, dest);
	for (let i = 0; i < movAmnt; i++) {
		//crateArr[dest].unshift(crateArr[origin].unshift());
		//console.log(dest);
		//console.log(crateArr[dest]);
		let removedItem = crateArr[origin].shift();
		//console.log(removedItem);
		crateArr[dest].unshift(removedItem);
		//console.log(crateArr);
	}
});
let ans = "";
crateArr.forEach((arr) => {
	ans += arr[0];
});

console.log(ans);
