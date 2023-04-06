const express = require('express')
const events = require('./eventCategories');
const links = require('./eventLinks');
const router = express.Router()

const getCategories = (req, res, err)=>{
    const categoriesJson = {
        categories: events,
        links: links
    };
    res.json(categoriesJson);
}

router.get("/getCategories", getCategories);

module.exports = router;
