const Comment = require('../models/comment_model')
const PostController = require('../controllers/post_controller')


const createComment = async (req, res) => {
    try {
        let cmt = await Comment.create(req.body)
        PostController.addComment(req.body.post, cmt._id)
        res.status(201).json(cmt)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getComments = async (req, res) => {
    try {
        const usrs = await Comment.find({})
        console.log(usrs)
        res.status(200).json(usrs)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const cmt = await Comment.find({ post: req.params.postId }).sort({ $natural: -1 })
        res.status(200).json(cmt)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const addLike = async (req, res) => {
    _updatePost(req.params.id, { '$inc': { likes: '1' } }, res)
}

const updateComment = async (req, res) => {
    _updatePost(req.params.id, req.body, res)
}

const _updatePost = async (id, body, res) => {
    try {
        console.log(id)
        const usr = await Comment.findByIdAndUpdate(
            { _id: id },
            body,
            { new: true, upsert: false })
        if (usr) {
            res.status(201).json(usr)
        }
        else {
            res.status(404).json({ err: `Comment not found for id: ${id}` })
        }
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${req.params.id}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).json({ error: msg })
        } else {
            console.error(err)
            res.status(500).send({ error: err })
        }
    }
}

const deleteComment = async (req, res) => {
    try {
        // console.log(req.params.id)
        const usr = await Comment.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (usr) {
            res.status(200).json(usr)
        }
        else {
            res.status(404).json({ err: `Comment not found for id: ${req.params.id}` })
        }
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${req.params.id}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).json({ error: msg })
        } else {
            res.status(500).json({ error: err })
        }
    }
}

module.exports = { createComment, getComments, getCommentsByPostId, addLike, updateComment, deleteComment }