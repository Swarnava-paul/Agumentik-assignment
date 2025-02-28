const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type : String,
        required:true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    likes :{
        type : String,
        default : 0
    },
    comments:{
        type:String,
        default : 0
    },
    hashTags:{
        type : Array,
        default : [],
    }
},{versionKey:false});

module.exports = mongoose.model('Post', postSchema);