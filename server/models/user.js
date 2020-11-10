const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:  {
    type: String,
    min:[4, "Too short, the minimum length is 4 characters."],
    max: [32, "Too long, the maximum is 32 characters."],
    unique: true,
    required: "Username is required!"
  },
  email: {
    type: String,
    max: [128, "Too long, the maximum is 128 characters."],
    min: [8, "Too short, the minimum is 8 characters."],
    unique: true,
    lowercase: true,
    required: 'Email is required!',
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
  },
  password: {
    type: String,
    min: [8, 'Too short, the minimum length is 8 characters.'],
    max: [23, 'Too long, the maximum is 23 characters.'],
    required: 'Password is required!',
  },
  profileImageUrl: {
    type: String
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book"}],
  confirmed: {
    type: Boolean,
    default: false
  }
});


/* pre save hook */
userSchema.pre('save', async function(next) {
  const user = this;
  const salt = 10;

  bcrypt.genSalt(salt, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      // override plain password with hashed password
      user.password = hash;
      // store data to DB and continue with next function in the chain
      next();
    });
  });

  const myPlaintextPassword = user.password;
  
  // Before anything is going to be saved to Mongo DB it will run this async function.
  try {
    if(!user.isModified("password")) {
      // If the user has not modified the password we are going to move to the next()
      return next();
    }
    // wait for the password to hash
    let hashedPassword = await bcrypt.hash(myPlaintextPassword, salt);
    // set hashedPassword to a user.password property
    user.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err); // send error to an error handler
  }
});

// COMPARE PASSWORD add method to the userSchema
userSchema.methods.comparePassword = function(providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password)
}

// assign User model
const User = mongoose.model("User", userSchema);

module.exports = User;
