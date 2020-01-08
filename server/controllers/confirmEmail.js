const User = require('../models/user');
const config = require('../config');

// CONFIRM EMAIL
/* When user visit Confirmation page by clicking on link provided in email*/
exports.confirmEmail = async function(req, res, next) {
  try {
    // Take Id from req.params.id, it comes from url
    const {id} = req.params
    User.findById(req.params.id)
      .then(user => {
        if(!user) {
          /*if user doesn't exist, someone try to break in*/
          res.json({msg: "This user doesn't exist"})
        }
        else if (user && !user.confirmed) {
          // If the user exist but it is not confirmed
          User.findByIdAndUpdate(id, { confirmed: true})
            .then(() => res.json({ msg: "User Confrimd Registration!"}))
            .catch(err => console.log(err))
        }
        else {
          // the user has already confirmed this email address!
          res.json({ msg: "You already confirmed this email address!"})
        }
      })
    //return res.status(200).json(user);

  } catch (err) {
    return next(err)
  }
}
