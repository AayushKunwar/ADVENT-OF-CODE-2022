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
	}
	operation(old, op) {
		return eval(`${old} ${op}`);
	}
	addItem(item) {
		this.items.push(item);
	}
}

input.forEach(initMain);

function initMain(piece) {
	const line = piece.split("\r\n");
	let id = Number(line[0].match(/\d+/g));
	let items = line[1].match(/\d+/g);
	let opern = line[2].slice(23);
	let divBy = Number(line[3].match(/\d+/g));
	let ifTrue = Number(line[4].match(/\d+/g));
	let ifFalse = Number(line[5].match(/\d+/g));
	let monkey = new Monkey(id, items, opern, divBy, ifTrue, ifFalse);
	console.log(monkey);
}
