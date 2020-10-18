class customError extends Error{
    constructor(res, status, message) {
        super();
        this.status = 500 || status;
        this.res = res;
        this.message = "Internal Server Error" || message;
    };

    NotFound(data) {
        const status = this.status = 404;
        const message = this.message = "Not Found";
        this.res.status(this.status).render('Errors/notFound.ejs', {status, message, data}); //*Strangely cant use 'this' when passing data through ejs frontend
    }
}

module.exports = customError;