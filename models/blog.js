const mongoose  = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default: "admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)