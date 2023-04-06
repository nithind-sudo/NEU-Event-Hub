const express = require('express')
const events = require('./eventCategories');
const router = express.Router()

const getCategories = (req, res, err)=>{
    const categoriesJson = {
        categories: events
    };
    res.json(categoriesJson);
}

router.get("/getCategories", getCategories);

module.exports = router;
