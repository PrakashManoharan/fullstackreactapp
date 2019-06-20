//  Main starting point of the application
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/*
// Test development goes here

app.get('/', (req, res) => {
  res.send({ hi: "buddy" });
})



*/
/* // Main starting point of the application

const express = require(`express`);
const http = require(`http`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
const router = require(`./router`);
const mongoose = require(`mongoose`);
const app = express();
const cors = require('cors');

// DB Setup

mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });

/* mongoose.connection
  .once(`open`, () => console.log(`Good to Go`))
  .on(`error`, error => {
    console.warn(`warning`, error);
  }); */

// App Setup

//app.use(morgan(`combined`));
//app.use(cors());
//app.use(bodyParser.json({ type: `*/*` }));
//router(app);

// Server Setup

/*const port = process.env.PORT || 5501;
const server = http.createServer(app);

app.listen(port);
console.log(`Server running on port 5501`);
 */
