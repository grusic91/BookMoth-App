const nodemailer = require('nodemailer');
const User = require('../models/user');
const config = require('../config');

/* Set up nodemailer Transporter*/
var transport = {
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD
  }
}

var transporter = nodemailer.createTransport(transport);
// just verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log('All works fine, congrats!');
  }
});
//------------------------------------------

// This function is fired!
exports.sendVerificationEmail = async function(req, res, next) {
  /* Get Data from user Input and Save it to DB without verification */
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
    const { email, username } = req.body; // collect users input

    /*find if user is already in DB*/
    User.findOne({email})
      .then(user => {
        // if user is not in DB, create a user and send them confirmation email
        // and /*If user exist, but it is not confirmed jet, send email*/
        if (!user) {
          // new user create
          User.create(req.body)
            .then(newUser => {
              //console.log("NE2 USER CREATED " + newUser.email)
              // unverified user is created, but not verified yet, so
              // send him verification mail
              const mail = {
                from: config.MAIL_USER,
                to: email,
                subject: 'Contact form request',
                html: '<a href='+ `${config.CLIENT_ORIGIN}/confirm/${newUser._id}` +'>BookMoth Confirmation click!<a/>'
              }

              transporter.sendMail(mail, (err, data) => {
                if(err) {
                  res.json({
                    msg: 'fail'
                  })
                } else {
                  //console.log(data);
                  res.status(200).json({msg: 'sended'})
                }
              })
            }) // end of then create user
        } // end of if(!user)
        else if (user && !user.confirmed) {
          // if user is in db user but its account is not confirmed yet,
          // send him another verification mail
          //console.log("OLD BUT NOT CONFIRMED USER " + user.email);

          const mail = {
            from: config.MAIL_USER,
            to: user.email,
            subject: 'Contact form request',
            html: '<a href='+ `${config.CLIENT_ORIGIN}/confirm/${user._id}` +'>BookMoth Confirmation click!<a/>'
          }
          // send another mail!
          transporter.sendMail(mail, (err, data) => {
            if(err) {
              res.json({
                msg: 'fail'
              })
            } else {
              res.status(200).json({msg: 'sended'})
            }
          })
        } // end of elif!
        else {
          // user is confirmed so send back to the client this data
          //console.log("THIS USER IS ALREADY CONFIRMED!!!");
          return res.status(200).json({ msg: "already confirmed" });
        }
      }), //end of then
      (err) => {
        //console.log("error");
        return res.status(200).json({ msg: "already confirmed" }); // error
      } // end of then find user

  } catch (err) {
    // if validation fails!
    if(err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken!";
    }
    next(err);
  }
}

// missing email and password
function missingUsersInput (res) {
  return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide email and password!"}]});
}
