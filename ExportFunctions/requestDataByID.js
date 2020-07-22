//*-----------------------------------------------------------------------------------------------------------------------------------
//* Function overloading would have been useful here, instead of two similar functions (requestDataByName), but not supporeted in JS:/
//*-----------------------------------------------------------------------------------------------------------------------------------

//#region INITILISATION
//*Fetch
const fetch                 = require('node-fetch');
//#endregion


//TODO Not sure if im happy with this function, think it is doing too much. Shouldnt be responsible for rendering the page. 
//TODO maybe just return the 'data' variable
async function requestDataByID(res, ID, APILink, pageToRender){
    try {
        //*Send request to the api and parse to JSON
        const response = await fetch(APILink + ID);
        const data = await response.json();

        //*Render page 
        res.render(pageToRender, {data});
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = requestDataByID;