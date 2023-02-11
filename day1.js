const fs = require("fs");

fs.readFile("input/day1.txt", "utf-8", (err, data) => {
	if (err) throw err;
	const input = data.split("\n").map(Number);

	//console.log(input);
	let max = 0;
	let maxCount = 0;
	for (let i = 0; i < input.length - 1; i++) {
		if (input[i]) {
			maxCount = maxCount + Number(input[i]);
			//console.log(maxCount);
		} else {
			//console.log(maxCount);
			if (max < maxCount) {
				max = maxCount;
				//console.log("maxCount = " + maxCount);
			}
			maxCount = 0;
		}
	}
	console.log("max ah = " + max);
});
// 72718
