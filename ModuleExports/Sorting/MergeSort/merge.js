module.exports = function merge(arr1, arr2) {
	//* Create empty array
	const mergedArr = [];
	let i = 0;
	let j = 0;

	while (i < arr1.length && j < arr2.length) {
		//* If the 1i date added is greater than 2j then push 2j as it was added as fav before
		if (arr1[i].Added > arr2[j].Added) {
			mergedArr.push(arr1[i]);
			i += 1;
		} else {
			mergedArr.push(arr2[j]);
			j += 1;
		}
	}

	while (i < arr1.length) {
		mergedArr.push(arr1[i]);
		i += 1;
	}

	while (j < arr2.length) {
		mergedArr.push(arr2[j]);
		j += 1;
	}

	return mergedArr;
};
