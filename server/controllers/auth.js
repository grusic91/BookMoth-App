const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/dev");

// REGISTER USER
exports.register = async function(req, res, next) {
  try {

    //check for email and password
    if (!req.body.password || !req.body.email) {
      return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide email and password!"}]});
    }
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).send({errors: [{title: "Invalid password!", detail: "Password is not the same as confirmation password!"}]});
    }

    // Check if user with provided email already exist in DB
    const user = await User.create(req.body); //req.body are data from ajax request
    let { id, username, profileImageUrl} = user;

    // assign token
    let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, config.SECRET_KEY);

    // if passes everything to this point, we get this response
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });

    await user.save();

    // handling mongoose errors:
  } catch (err) {
    // if walidation fails!
    if(err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken!";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}

exports.auth = function(req, res) {

}
