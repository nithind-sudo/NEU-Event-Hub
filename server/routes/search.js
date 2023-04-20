const express = require("express");
const Event = require("../models/events");
const router = express.Router();

const eventSearch = async(req, res, err)=>{
    let event_name = new RegExp(req.params.event_name);
    let searchedEvents = await Event.find({'title':event_name}).exec();
    res.send(searchedEvents);
}
const eventSearchAll = async(req, res, err)=>{
    let searchedEvents = await Event.find().exec();
    res.send(searchedEvents);
}

router.get("/event/", eventSearchAll);
router.get("/event/:event_name", eventSearch);

module.exports = router;