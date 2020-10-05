const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
// Author Schema - for Book Collection in MongoDB
const authorSchema = new Schema({  
  name: { type: String, required: true, max: [128, "Too long, max is 128 characters"]},
  born: {type: Number },
  die: { type: Number }
});

/**
 * In MongoDB database we have collection Book, which look like bookSchema
 */
module.exports = mongoose.model("Author", authorSchema);
=======
const authorSchema = new Schema({
    name: { 
        type: String,
        required: true, max: [128, "Too long, max is 128 characters"]
    },
    born: {type: Number},
    death: {type: Number}
})

module.exports = mongoose.model('Author', authorSchema);
>>>>>>> feature/set-graphql
