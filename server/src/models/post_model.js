const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)
module.exports = Post