// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

//Home page with google sign in
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

//New User Landing Page
  app.get("/newTrip", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newTrip.html"));
  });

//Existing User Landing Page
  app.get("/trips", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/trips.html"));
  });

//Trip Details page (lists all entries for a trip)
  app.get("/tripSummary", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tripSummary.html"));
  });

//Entry detail page, shows the click on trip's specific entry that the user selected
  app.get("/entries", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/entries.html"));
  });

//New and Existing user add a new trip entry
  app.get("/addtrip", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addTrip.html"));
  });
};
