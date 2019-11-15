const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title:  { type: String, required: true, max: [200, "Too long, max is 200 characters"]},
  author: { type: String, required: true, max: [128, "Too long, max is 128 characters"]},
  languege: String,
  publisher: String,
  category: {type: String, required: true, lowercase: true},
  pages: Number,
  description: {type: String, required: true},
  cratedAt: { type: Date, default: Date.now },
  image_url: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model("Book", bookSchema);
