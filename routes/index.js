var express = require("express");
var router = express.Router();
var postalAbbreviations = require("../us_state.js");
const { formatData } = require("../controllers/search.controller.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Find My Election",
    states: postalAbbreviations,
  });
});

router.post("/search", async function (req, res, next) {
  try {
    const city = req.body.city.toLowerCase().replace(/ /g, "_");
    const state = req.body.state.toLowerCase();
    const url = `https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:${state},ocd-division/country:us/state:${state}/place:${city}`;
    const votingRes = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    let votingData = await votingRes.json();
    for (let i = 0; i < votingData.length; i++) {
      votingData[i] = formatData(votingData[i]);
    }
    res.render("search", {
      title: "Your Search results",
      votingData,
    });
  } catch (error) {
    console.log("error:", error);
  }
});

module.exports = router;
