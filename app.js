//#region INITILISATION
//*Express
const express               = require('express');
const app                   = express();
                           // app.use(express.static("public"));
//#endregion

//#region ROUTES
app.get(`/`, (req, res) => {
    res.render(`index.ejs`);
})
//#endregion
//#region SERVER
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
//#endregion
