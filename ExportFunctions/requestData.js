//#region INITILISATION
//*Fetch
const fetch                 = require('node-fetch');
//#endregion

async function requestData(app, res, requestBodyName, APILink, expressInstanceName, redirect){
    try {
        //*Get the form data
        ////const team = requestBodyName;

        //*Send request to the api and parse to JSON
        const response = await fetch(APILink + requestBodyName);
        const data = await response.json();

        //*Store the variable in the Express instance
        app.set(expressInstanceName, data);

        //*Redirect to players endpoint 
        res.redirect(redirect);
    } catch (error) {
        console.error(error);
    }
}

module.exports = requestData;