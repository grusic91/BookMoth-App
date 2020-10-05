const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: { 
        type: String,
        required: true, max: [128, "Too long, max is 128 characters"]
    },
    born: {type: Number},
    death: {type: Number}
})

module.exports = mongoose.model('Author', authorSchema);