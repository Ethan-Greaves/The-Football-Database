class customError extends Error {
	constructor(res, status, message) {
		super();
		this.status = 500 || status;
		this.res = res;
		this.message = 'Internal Server Error' || message;
	}

	NotFound(data) {
		this.status = 404;
		this.message = 'Not Found';
		const { status, message } = this;
		this.res.status(this.status).render('Errors/notFound.ejs', { status, message, data }); //* Strangely cant use 'this' when passing data through ejs frontend
	}

	Unauthorised() {
		this.status = 401;
		this.message = 'Unauthorised';
		const { status, message } = this;
		this.res
			.status(this.status)
			.render('Errors/unauthorised.ejs', { status, message, unauthorised: true });
	}
}

module.exports = customError;
