const mongoose = require('mongoose');

const messegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    messege: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Messege',messegeSchema)