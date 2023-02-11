const fs = require("fs");
const { start } = require("repl");

const data = fs.readFileSync("input/day7.txt", { encoding: "utf-8" });

let input = data.split("\r\n");

//console.log(input);
// ls cd commands
// constains dir and number
input.shift();
class Node {
	constructor(name, parent) {
		(this.name = name),
			(this.size = 0),
			(this.children = []),
			(this.parent = parent);
	}
	addFile(data) {
		this.size += data;
	}
	addDir(name, parent) {
		this.children.push(new Node(name, parent));
	}
}
let node = new Node("home", null);
let ptr = node;

startCommand(input);
// call this function
function startCommand(input) {
	//console.log("start Command started");
	//console.log(input);
	let line = input.shift();
	if (line[0] == "$") {
		// command detected
		//console.log("command foking detectd");
		//console.log(line);
		if (line[2] == "c") {
			//cd command here
			//console.log("call the foking cd command");
			cd(line);
			startCommand(input);
		} else if (line[2] == "l") {
			//ls command here
			ls(input);
			return;
		}
	}
}

function cd(line) {
	// change to ptr
	//console.log("cd is called");
	//console.log(line);
	let dest = line;
	//let dest = line.match(/[^\$ cd ]+/g);
	dest = line.substring(5);
	//console.log("what is detected " + dest);
	if (dest == "..") {
		ptr = ptr.parent;
		return;
	}
	ptr = ptr.children.filter((x) => x.name == dest);
	ptr = ptr[0];
	//console.log(ptr);
	return;
}
function ls(input) {
	// go throught each line and do stuff
	//console.log(input);
	let line = input[0];
	//console.log("started ls with " + line);
	if (line[0] == "$") {
		// do sth
		return;
	} else if (line[0] == "d") {
		// add dir
		ptr.addDir(line.substring(4), ptr);
	} else {
		// assumed file
		let [num] = line.match(/(\d+)/g);
		num = Number(num);
		//console.log(num);
		//console.log(ptr);
		ptr.addFile(num);
	}

	input.shift();
	//console.log(input);

	//console.log(input);
	//console.log(input.length);
	if (input.length == 0) {
		//console.log("returned is called from ls");
		return 0;
	}
	//console.log("testing this " + input[0][0]);
	if (input[0][0] != "$") {
		ls(input);
		return;
	}
	//console.log("returned with");
	//console.log(input);
	startCommand(input);
	return;
}

// now traverse through tree and add the inner directory size to outer directory

ptr = node;
traverse(ptr);

function traverse(obj) {
	if (obj.children.length != 0) {
		obj.children.forEach(traverse);
	}
	if (obj.parent == null) return;
	obj.parent.size += obj.size;
}

//console.log(node);
class DList {
	constructor(name, size) {
		(this.name = name), (this.size = size);
	}
}

let dirList = [];

function part1(obj) {
	console.log(obj.name);
	console.log(obj.size);
	dirList.push(new DList(obj.name, obj.size));

	obj.children.forEach(part1);
}
part1(node);
console.log(dirList);

let sumPart1 = dirList
	.filter((x) => x.size < 100000)
	.reduce((a, obj) => a + obj.size, 0);
console.log("part1 is " + sumPart1);

let reqSize = 70_000_000 - node.size;
reqSize = 30_000_000 - reqSize;

let part2 = dirList.filter((x) => x.size > reqSize).map((x) => x.size);
//console.log(part2);
part2 = part2.reduce((a, b) => (a > b ? b : a), part2[0]);
console.log(part2);
