class customError extends Error{
    constructor(res, status, message) {
        super();
        this.status = 500 || status;
        this.res = res;
        this.message = "Internal Server Error" || message;
    }

    NotFound(data) {
        // TODO
        this.status = 404;
        this.message = "Not Found";
        this.res.status(this.status).render('Errors/notFound.ejs', {status, this.message, data}); //* Strangely cant use 'this' when passing data through ejs frontend
    }

    Unauthorised() {
        const status = this.status = 401;
        const message = this.message = "Unauthorised";
        this.res.status(this.status).render('Errors/unauthorised.ejs', {status, message, unauthorised: true});
    }

    
}

module.exports = customError;