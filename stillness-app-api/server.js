if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const MongoClient = require('mongodb').MongoClient

const mongoose = require('mongoose')

const passport = require('passport')
const flash = require('connect-flash');

const ObjectId = require('mongodb').ObjectID;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')
const twilio = require('twilio');

const configDB = require('./config/database.js');

let db;

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const twilioClient = require('twilio')(accountSid, authToken);

mongoose.connect(configDB.url, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  //requiring what the file is exporting (function is exported in routes and i'll have access that function and as soon as it is required the function is immeditately executed)
  require('./app/routes.js')(app, passport, db, twilioClient, ObjectId);
}); // connect to our database
//   require('./app/routes.js')(app, passport, ObjectId);
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(cors())
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json())

app.use(session({
  secret: 'rcbootcamp2019a', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.listen(PORT, console.log(`server is running on ${PORT}`));

