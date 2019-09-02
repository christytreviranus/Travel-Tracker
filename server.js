// ******************************************************************************
// *** Dependencies
// =============================================================

const express = require("express");
// const multer = reuire("multer");
const path = require("path");
// const passportSetup = require('./config/passport.js');
const keys = require("./keys.js");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const exphbs = require("express-handlebars");
// Authentication packages
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Set storage engine
// const storage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: function(req, file, cb){
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// Init multer
// const upload = multer({
//   storage: storage
// }).single('picture');

// Requiring our models for syncing
const db = require("./models");

// Import routes and give the server access to them.
const index = require('./controllers/user-controller');


// dotenv for securing sensitive information
require("dotenv").config();



// Static directory
app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// cookie session - used for google oAuth
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.cookiekey]
// }))

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for body-parser - using express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express-mysql-session
let options = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'travel_tracker',
};

const sessionStore = new MySQLStore(options);


app.use(session({
  secret: 'pejtpewjtptjww',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./controllers/trip-controller.js")(app);
require("./controllers/entry-controller.js")(app);
app.use('/', index);
app.get("/css", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/css/style.css"))
});

passport.use(new LocalStrategy(

  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, 

function(req, username, password, done) {
 
  // const User = user;
  const User = require("./models/user.js");
  const bcrypt = require('bcrypt');

  let isValidPassword = function(userpass, password) {
      return bcrypt.compareSync(password, userpass);
  }

  db.User.findOne({
      where: {
          username: username
      }
  }).then(function(user) {

      if (!user) {
          return done(null, false, {
              message: 'User does not exist'
          });
      }

      if (!isValidPassword(user.password, password)) {
          return done(null, false, {
              message: 'Incorrect password.'
          });
      }

      let userinfo = user.get();
      return done(null, userinfo);

  }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
          message: 'Something went wrong with your Signin'
      });
  });
}
));


// Syncing our sequelize models and then starting our Express app
// =============================================================

// this line drops the current table if already exists
// db.sequelize.sync({ force: true }).then(function() {

db.sequelize.sync().then(function () {               //this line allows tables to remain without getting dropped everytime server is restarted
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});






