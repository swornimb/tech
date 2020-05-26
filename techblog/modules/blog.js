const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
 
    },
    post:{
      type: String,
      required: true  
    },
    image:{
        type: String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    date:{
        type: String,
        default: new Date,
        required:true
    },
    category:{
        type:Array,
        required: true
    },
    views:{
        type:Number,
        default:0
    },
    comment:{
        type:Array
    }
})



module.exports = mongoose.model('Posts',postSchema)