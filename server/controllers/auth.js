const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

// REGISTER USER
exports.register = async function(req, res, next) {
  try {
    //check for email and password
    if (!req.body.password || !req.body.email) {
      return missingUsersInput(res);
    }
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).send(
        {errors: [{title: "Invalid password!", detail: "Password is not the same as confirmation password!"}]}
      );
    }

    // Check if user with provided email already exist in DB
    const user = await User.create(req.body);
    let { id, username, profileImageUrl} = user;

    // assign token
    let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, config.SECRET_KEY, { expiresIn: '1h'});

    // if passes everything to this point, get back token
    return res.status(200).json({ token });
    //await user.save();

  } catch (err) {
    // if validation fails!
    if(err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken!";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}

/* Login or Authenticate*/
exports.auth = async function(req, res, next) {
  try {
    // check if there are user and password
    if (!req.body.password || !req.body.email) {
      return missingUsersInput(res);
    }
    // find user in DB by email

    const user = await User.findOne({ email: req.body.email },
      await async function(err, user){
        if (err) {
          return next({
            status: 400,
            message: err.message
          });
        }
        // if user does not exist
        if(!user) {
          return res.status(422).send({errors: [{title: "Data missing!", detail: "User does not exist!"}]});
        } else {
          // User exist so, go and asign it a token
          let { id, username, profileImageUrl } = user;

          let isMatch = await user.comparePassword(req.body.password);
          if (isMatch) {
            // create token
            let token = jwt.sign({
              id,
              username,
              profileImageUrl
            }, config.SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({ token });

          } else {
            return next({
              status: 400,
              message: "Invalid email/password"
            });
          }
        } // closing else if user exist
      }
    );
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}

/* AUTHENTICATION MIDDLEWARE*/
//
exports.authMiddleware = async function(req, res, next) {
  // get token from headers
  try {
    const token = req.headers.authorization;
    if (token) {
      // parse token to get user
      const user = parseToken(token);
      // check if decoded user is in DB

      await User.findById(user.id, function(err, foundUser) {
        // if there is not found user from decoded token return error
        if (err) {
          return next({
            status: 400,
            message: err.message
          });
        }

        if(foundUser) {
          // we are autorized and pass user to next handler
          res.locals.user = foundUser;
          next();
        } else {
          return  notAuthorized(res);
        }
      })
    }
    else {
      return  notAuthorized(res);
    }

  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}

function parseToken (token) {
  // decode token
  return jwt.verify(token.split(" ")[1], config.SECRET_KEY);
}

// handling not authorized error
function notAuthorized(res) {
  return res.status(401)
    .send({errors: [{title: "Not autorized!", detail: "Access denied you need to login!"}]});
}

// missing email and password
function missingUsersInput (res) {
  return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide email and password!"}]});
}
