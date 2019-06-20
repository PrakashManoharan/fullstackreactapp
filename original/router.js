const Authentication = require(`./controllers/authentication`);
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  // Get authentication from the server
  app.post('/signin', requireSignin, Authentication.signin);
  // Get response from the server
  app.post('/signup', Authentication.signup);
};

/*
module.exports = function (app) {
  // Get response from the server
  app.get(`/`, (req, res) => {
    res.json([`Water Bottle`, `Laptop`, `Phone`]);
  });
}; */

// Post data to the server
/* app.post(`/api/posts`, (req, res, next) => {

} */
