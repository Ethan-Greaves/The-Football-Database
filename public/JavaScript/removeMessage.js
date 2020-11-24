// eslint-disable-next-line no-unused-vars
function removeMessage() {
	const successMessage = document.getElementById('message');
	const element = document.querySelector('.success');
	const style = getComputedStyle(element);
	//* animation duration = "5s" split in half to remove the 's' and get the number
	const counter = style.animationDuration.split('')[0];

	setTimeout(() => {
		successMessage.remove();
	}, Number(counter * 1000)); //* countdown operates in ms so e.g. 5 * 1000 = 5000. 5000ms = 5s
}
