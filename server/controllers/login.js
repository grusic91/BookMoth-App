const User    = require('../models/user');
const jwt     = require('jsonwebtoken');
const config  = require('../config');


/* Login - Authenticate*/
exports.login = async function(req, res, next) {
  try {
    const { email, password } = req.body;
    // check if there are user and password
    if (!password || !email) {
      return res.sendApiError({
        title: 'Missing Data',
        detail: 'Email or password'
      });
    }

    // find user in DB by email
    await User.findOne({ email }, (err, foundUser) => {
        if (err) {
          return res.mongoError(err);
        }
        // if user in DB does not exist
        if(!foundUser) {
          return res.status(422).send({errors: [{title: "Data missing!", detail: "User does not exist!"}]});
        } 
          
        console.log(foundUser.comparePassword(password))
        if(foundUser.comparePassword(password)) {
         
          
          // User exist! Generate JWT          
            let token = jwt.sign({
              sub: foundUser._id,
              email: foundUser.email,
            }, config.SECRET_KEY, { expiresIn: '2h' });

            return res.status(200).json(token);

          } else {
            return res.status(422).send({errors: [{title: 'Invalid Password', detail: 'Provided password is wrong!'}]});
          }
      });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}

// missing email and password
function missingUsersInput (res) {
  return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide email and password!"}]});
}
