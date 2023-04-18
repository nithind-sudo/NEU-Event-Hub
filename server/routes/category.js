const express = require("express");
const events = require("./eventCategories");
const categories = require("./getCategories");
const links = require("./eventLinks");
const eventIcons = require("./eventIcons");
const router = express.Router();

const getCategories = (req, res, err) => {
  const categoriesJson = {
    categories: events,
    icons: eventIcons,
    links: links,
  };
  res.json(categoriesJson);
};

const getCategory = (req, res, err) => {
  const categoryName = req.params.categoryName;
  if (categoryName == "studentOrganized") {
    res.send(categories.studentOrganized);
  }
  if (categoryName == "professorOrganized") {
    res.send(categories.professorOrganized);
  }
  if (categoryName == "speakerOrganized") {
    res.send(categories.speakerOrganized);
  }
  if (categoryName == "managementOrganized") {
    res.send(categories.managementOrganized);
  }
  if (categoryName == "csOrganized") {
    res.send(categories.csOrganized);
  }
  if (categoryName == "engineeringOrganized") {
    res.send(categories.engineeringOrganized);
  }
  if (categoryName == "cpsOrganized") {
    res.send(categories.cpsOrganized);
  }
  if (categoryName == "cosOrganized") {
    res.send(categories.cosOrganized);
  }
  if (categoryName == "dAmoreOrganized") {
    res.send(categories.dAmoreOrganized);
  }
};

router.get("/getCategories", getCategories);
router.get("/getCategories/:categoryName", getCategory);

module.exports = router;
