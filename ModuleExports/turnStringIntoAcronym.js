function turnStringIntoAcronym(paramString) {
	const firstLetters = [];
	let string = paramString;
	let letters = '';

	if (string === 'Goalkeeper') string = 'goal keeper';

	//* Check if string is more than one word
	if (string.trim().indexOf(' ') !== -1) {
		//* split the string into separate strings
		const words = string.split(' ');
		//* turn those strings into an array of characters
		words.forEach((word) => {
			letters = word.split('');

			//* Take the first element from each array and add to shortened position array
			firstLetters.push(letters[0]);
		});

		//* return the array as a string
		return firstLetters.join('');
	}

	//* else turn the one word string into 3 letter string using substr
	return string.substr(0, 3);
}

module.exports = turnStringIntoAcronym;
