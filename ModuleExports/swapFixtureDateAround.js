function swapFixtureDateAround(date) {
	const dateArr = date.split('-');
	const reversed = dateArr.reverse();
	return reversed.join('-');
}

module.exports = swapFixtureDateAround;
