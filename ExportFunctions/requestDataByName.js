//#region INITILISATION
//*Fetch
const fetch                 = require('node-fetch');
//#endregion

//*-------------------------------------------------------------------------------------------------------------------------------------
//TODO Not happy with this function. Does more than just request data, then goes to set a variable in express instance and redirect
//TODO Tried taking out unnecessary stuff but caused errors, variables not being defined mainly. Might just have to settle for DRY code.  
//*-------------------------------------------------------------------------------------------------------------------------------------

async function requestDataByName(app, res, name, APILink, expressInstanceName, redirect){
    try {
        //*Get the form data
        ////const team = requestBodyName;

        //*Send request to the api and parse to JSON
        const response = await fetch(APILink + name);
        const data = await response.json();

        //*Store the variable in the Express instance
        app.set(expressInstanceName, data);

        //*Redirect to another endpoint 
        res.redirect(redirect);

    } catch (error) {
        console.error(error);
    }
}

module.exports = requestDataByName;