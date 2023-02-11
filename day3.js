// refactor using .indexOf perhaps
// much shorter i think
const fs = require("fs");

fs.readFile("input/day3.txt", "utf-8", (err, data) => {
	if (err) throw err;
	const input = data.split("\r\n");
	// console.log(input);

	input.forEach((element) => {
		let comp1 = element.slice(0, element.length / 2);
		element = element.slice(element.length / 2, element.length);

		// console.log(comp1, element);
		for (let i = 0; i < comp1.length; i++) {
			for (let j = 0; j < comp1.length; j++) {
				// console.log("checking " + comp1[i] + element[i]);
				if (comp1[i] === element[j]) {
					console.log(comp1[i]);
					//console.log(comp1);
					adder(comp1[i]);
					return;
				}
			}
		}
	});
	console.log(sum);
});
let sum = 0;

function adder(char) {
	let num = char.charCodeAt(0);
	if (num >= 97 && num <= 122) {
		sum += num - 97 + 1;
	} else if (num >= 65 && num <= 132) {
		sum += num - 65 + 27;
	}
}
