const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

/* AUTHENTICATION MIDDLEWARE*/
exports.authMiddleware = async function(req, res, next) {
    // get token from headers
    try {
      const token = req.headers.authorization;
      if (token) {
        // parse token to get user
        const decodedToken = parseToken(token);
        if (!decodedToken) { return notAuthorized(res); }
        
        // check if decodedToken is in DB  
        await User.findById(decodedToken.sub, function(err, foundUser) {
          // if there is not found user from decoded token return error
          if (err) {
            return res.status(422).send({errors: [{title: 'DB Error', detail: 'Ooops, something went wrong!'}]});
          }
  
          if(foundUser) {
            // we are autorized and pass user to next handler
            res.locals.user = foundUser;
            next();
          } else {
            return  notAuthorized(res);
          }
        });
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
    // returns decoded token or in case of error null
    try {
      return jwt.verify(token.split(' ')[1], config.SECRET_KEY)
    } catch (error) {
      return null;
    }
  }
  
  // handling not authorized user error
  function notAuthorized(res) {
    return res.status(401)
      .send({errors: [{title: 'Not authorized!', detail: 'Access denied you need to login!'}]});
  }
  