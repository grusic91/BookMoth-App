const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Boook Schema - for Book Collection in MongoDB
const bookSchema = new Schema({
  name:  { type: String,
            lowercase: true,
            required: true, max: [200, "Too long, max is 200 characters"]},
  authorId: {type: String},
  genre: {type: String},
  language: { type: String },
  edition: { type: String},
  publisher: { type: String },
  pages: {type: Number },
  description: { type: String, required: true},
  cratedAt: { type: Date, default: Date.now },
  image_url: {type: String, default: "https://via.placeholder.com/350x250"},
  isbn: {type: String, default: ""},
  users: [{ type: Schema.Types.ObjectId, ref: "User"}]
});

/**
 * In MongoDB database we have collection Book, which look like bookSchema
 */
module.exports = mongoose.model("Book", bookSchema);
