const User = require('../models/user');

// REGISTER USER - POST -> Creates new user
exports.register = async function(req, res, next) {
  try {
    const { email, password, passwordConfirmation} = req.body
    //check for email and password
    if (!password || !email) {
      return missingUsersInput(res);
    }
    if (password !== passwordConfirmation) {
      return res.status(422).send(
        {errors: [{title: "Invalid password!", detail: "Password is not the same as confirmation password!"}]}
      );
    }

    // Check if user with provided email already exist in DB
    User.findOne({email}, (error, existingUser) => {
      if (error) {
        return res.mongoError(error);
      }
      // user already exist
      if (existingUser) {
        return next({
          status: 400,
          message: 'User already exist'
        });
      }
    });

    
    const user = await User.create(req.body);
    user.save((error) => {
      if (error) {
        return res.mongoError(error);
      }
      // User is successfully registered!
      return res.json({status: 'Successfull registered!'});
    });


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

// missing email and password
function missingUsersInput (res) {
    return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide email and password!"}]});
  }
  