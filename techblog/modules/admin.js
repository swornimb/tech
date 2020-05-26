const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,

    }

})

adminSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('Admin',adminSchema)