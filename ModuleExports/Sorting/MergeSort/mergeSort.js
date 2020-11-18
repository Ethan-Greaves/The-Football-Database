// #region INITILISATION
const merge = require('./merge');
// #endregion

module.exports = function mergeSort(arr) {
	if (arr.length <= 1) return arr;
	//* Find the midpoint of our array
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
};
