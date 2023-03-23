const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
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
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment