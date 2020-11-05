function formatPlayerGender(string) {
	if (string === 'Male') return 'M';
	if (string === 'Female') return 'F';

	return null;
}

module.exports = formatPlayerGender;
