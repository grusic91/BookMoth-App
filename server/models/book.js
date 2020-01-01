const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title:  { type: String,
            lowercase: true,
            required: true, max: [200, "Too long, max is 200 characters"]},
  author: { type: String,
            required: true, max: [128, "Too long, max is 128 characters"]},
  language: { type: String },
  edition: { type: String},
  publisher: { type: String },
  category: { type: String, required: true, lowercase: true},
  pages: {type: Number },
  description: { type: String, required: true},
  cratedAt: { type: Date, default: Date.now },
  image_url: {type: String, default: "https://via.placeholder.com/350x250"},
  isbn: {type: String, default: ""},
  users: [{ type: Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model("Book", bookSchema);
