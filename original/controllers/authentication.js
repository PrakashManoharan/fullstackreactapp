const User = require('../models/user');
const jwt = require(`jwt-simple`);
const config = require(`../config`);

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  //console.log(req.body);
  //const firstName = req.body.firstName;
  const email = req.body.email;
  const password = req.body.password;

  //res.send({ success: `true` });

  // see if a user with the given email exist

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    // if a user with email does exist
    if (existingUser) {
      return res.status(422).send({ error: `Email is already in use` });
    }
    // if a user with email doesn not exist, create an user and save record

    const user = new User({
      //firstName: firstName,
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicating the user is create
      res.json({ token: tokenForUser(user) });
    });
  });
};
