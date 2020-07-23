//#region INITILISATION
const express = require('express');
const router = express.Router();
//#endregion

router.get(`/`, (req, res) => {
    res.render(`index.ejs`);
})

module.exports = router;