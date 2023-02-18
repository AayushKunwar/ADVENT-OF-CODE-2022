const { executionAsyncId } = require("async_hooks");
const fs = require("fs");

const data = fs.readFileSync("input/day11temp.txt", { encoding: "utf-8" });

let input = data.split("\r\n\r\n");

class Monkey {
	constructor(id, items, opern, divBy, ifTrue, ifFalse) {
		this.id = id;
		this.items = items;
		this.opern = opern;
		this.divBy = divBy;
		this.ifTrue = ifTrue;
		this.ifFalse = ifFalse;
		this.itemInspected = 0;
	}
	operation(foo, op) {
		let old = foo;
		return eval(`${old} ${op}`);
	}
	addItem(item) {
		this.items.push(item);
	}
}
let worryDivider = 3;
let monkeyArr = [];
let roundCounter = 20;

function main() {
	input.forEach(initMain);
	console.log(monkeyArr);
	let counter = 1;
	while (counter <= roundCounter) {
		monkeyArr.forEach(roundMain);
		showRounds(counter);
		counter++;
	}

	part1();
}
main();
// worryDivider = 1;
// monkeyArr = [];
// roundCounter = 10000;
// main();
// AOC wants me to figure out some fancy maths problem

function showRounds(counter) {
	if (counter != 20) return;
	console.log(`--------after round ${counter}-------`);
	monkeyArr.forEach((monk) => {
		console.log(
			`monker ${monkeyArr.indexOf(monk)} inspected ${
				monkeyArr[monkeyArr.indexOf(monk)].itemInspected
			}`
		);
	});
}
function part1() {
	let max1 = 0,
		max2 = 0;
	monkeyArr.forEach((monkey) => {
		if (monkey.itemInspected > max1) {
			max2 = max1;
			max1 = monkey.itemInspected;
		}
	});
	// monkeyArr.forEach((monkey) => {
	// 	if (monkey.itemInspected > max2 && monkey.itemInspected != max1) {
	// 		max2 = monkey.itemInspected;
	// 	}
	// });
	console.log(max1, max2);
	console.log(`the monkey business level is ${max1 * max2}`);
}
function initMain(piece) {
	const line = piece.split("\r\n");
	let id = Number(line[0].match(/\d+/g));
	let items = line[1].match(/\d+/g);
	let opern = line[2].slice(23);
	let divBy = Number(line[3].match(/\d+/g));
	let ifTrue = Number(line[4].match(/\d+/g));
	let ifFalse = Number(line[5].match(/\d+/g));
	let monkey = new Monkey(id, items, opern, divBy, ifTrue, ifFalse);
	// console.log(monkey);
	items = items.map((str) => Number(str));
	monkeyArr.push(monkey);
}
// to find, monkey inspected item xxx times.
function roundMain(value, index) {
	// console.log(value);
	// console.log("for index: " + index);
	// console.log(`monkey ${index}`);
	roundMonkey(index);
}
function roundMonkey(index) {
	monkeyArr[index].items.forEach((item) => {
		// console.log(item);
		let worry = monkeyArr[index].operation(item, monkeyArr[index].opern);
		// console.log(`for ${item} worry is `);
		// console.log(worry);
		if (worryDivider != 1) worry = Math.floor(worry / worryDivider);
		// console.log(worry);

		if (worry % monkeyArr[index].divBy == 0) {
			let temp = monkeyArr[index].ifTrue;
			monkeyArr[temp].items.push(worry);
			// console.log(`${worry} level was div`);
			// console.log(`${worry} sent to monkey ${temp}`);
		} else {
			let temp = monkeyArr[index].ifFalse;
			monkeyArr[temp].items.push(worry);
			// console.log(`${worry} leven was not divisible`);
			// console.log(`${worry} sent to monkey ${temp}`);
		}
		monkeyArr[index].itemInspected = monkeyArr[index].itemInspected + 1;
		// console.log(`the item inspected by ${index} is ${monkeyArr[index]}`)
		monkeyArr[index].items = monkeyArr[index].items.filter(
			(foo) => foo !== item
		);
	});
}
