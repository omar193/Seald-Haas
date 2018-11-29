const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create a schema
const hashSchema = new Schema({
    data: {
        type: String,
        required: true,
    },
    algorithm: {
        type: String,
        required: true
    },
    iteration: {
        type: Number,
        required: true
    }
});




  

// Create a model
const Hash = mongoose.model('hash', hashSchema);

// Export the model
module.exports = Hash;