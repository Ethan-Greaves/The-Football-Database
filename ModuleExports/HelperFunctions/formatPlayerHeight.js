function formatPlayerHeight(string) {
	if (string !== '') {
		const words = string.split(' ');
		let height = words[0];

		//* No player has a height greater than 2 metres, if it is then we know that the ft height is being displayed first
		if (height > 2) {
			//* The height in metres is contained within brackets so use match to extract it
			const heightInsideBrackets = string.match(/\((.*)\)/);
			if (heightInsideBrackets != null) {
				let heightInMetres = heightInsideBrackets[1];

				//* Remove any whitespace from the string
				heightInMetres = heightInMetres.replace(/\s+/g, '');
				return heightInMetres;
			}

			height = `${words[0]}${words[1]} ${words[2]}"`;
			return height;
		}

		return `${height}m`;
	}

	return 'N/A';
}

module.exports = formatPlayerHeight;
