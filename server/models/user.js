const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:  {
    type: String,
    min:[4, "Too short, minimum length is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    unique: true,
    required: "Username is required!"
  },
  email: {
    type: String,
    max: [128, "Too long, max is 128 characters"],
    min: [8, "Too short, min is 8 characters"],
    unique: true,
    lowercase: true,
    required: 'Email is required!',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [23, 'Too long, max is 128 characters'],
    required: 'Password is required!',
  },
  profileImageUrl: {
    type: String
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book"}]
});

/* pre save hook */
userSchema.pre("save", async function(next) {
  const user = this;
  const myPlaintextPassword = user.password;
  const salt = 10;
  // before anything is going to be saved to mongo it will run this async function
  try {
    if(!user.isModified("password")) {
      // if user is not modified the password we are going to move on the next()
      return next(); //move on
    }
    /*wait password to hash*/
    let hashedPassword = await bcrypt.hash(myPlaintextPassword, salt);
    // set hashedPassword on a user.password property
    user.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err); // send error to an error handler
  }
});

// COMPARE PASSWORD add method to the userSchema
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; // returns true if success
  } catch (err) {
    return next(err);
  }
}

// assign User model
const User = mongoose.model("User", userSchema);

module.exports = User;
