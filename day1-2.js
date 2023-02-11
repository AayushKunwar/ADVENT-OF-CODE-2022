const fs = require("fs");

fs.readFile("input/day1.txt", "utf-8", (err, data) => {
	if (err) throw err;
	const input = data.split("\n").map(Number);

	let sum = [0];
	let i = 0;

	input.forEach((element) => {
		if (element) {
			sum[i] = sum[i] + element;
		} else {
			i++;
			sum.push(0);
		}
	});

	console.log(Math.max(...sum));

	let top3 = 0;
	top3 += Math.max(...sum);
	sum = arrRemove(sum, Math.max(...sum));
	top3 += Math.max(...sum);
	sum = arrRemove(sum, Math.max(...sum));
	top3 += Math.max(...sum);

	console.log(top3);
});

function arrRemove(arr, value) {
	return arr.filter((ele) => ele != value);
}
