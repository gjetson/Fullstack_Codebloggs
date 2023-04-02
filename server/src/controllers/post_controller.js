const Post = require('../models/post_model')


const createPost = async (req, res) => {
    try {
        const pst = await Post.create(req.body)
        res.status(201).json(pst)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getPosts = async (req, res) => {
    try {
        const pst = await Post.find({}).populate('user').populate('comments').sort({ $natural: -1 })
        console.log(pst)
        res.status(200).json(pst)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getPostsByUserId = async (req, res) => {
    try {
        const pst = await Post.find({ user: req.params.userId }).populate('comments').sort({ $natural: -1 })
        console.log(pst)
        res.status(200).json(pst)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const incrementLike = async (req, res) => {
    _updatePost(req.params.id, { '$inc': { likes: '1' } }, res)
}

const addComment = async (postId, commentId) => {
    try {
        const pst = await Post.updateOne({ _id: postId }, { $push: { comments: commentId } })
        console.log(pst)
        res.status(200).json(pst)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getPost = async (req, res) => {
    try {
        const pst = await Post.findById(req.params.id)
        res.status(200).json(pst)
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

const getLatestPostByUserId = async (req, res) => {
    try {
        console.log(req.params.userId)
        const pst = await Post.find({ user: req.params.userId }).limit(1).sort({ $natural: -1 })
        res.status(200).json(pst)
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${req.params.userId}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).json({ error: msg })
        } else {
            console.error(err)
            res.status(500).send({ error: err })
        }
    }
}

const updatePost = async (req, res) => {
    _updatePost(req.params.id, req.body, res)
}

const _updatePost = async (id, body, res) => {
    try {
        console.log(body)
        const pst = await Post.findByIdAndUpdate(
            { _id: id },
            body,
            { new: true, upsert: false })
        if (pst) {
            res.status(201).json(pst)
        }
        else {
            res.status(404).json({ err: `Post not found for id: ${id}` })
        }
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${id}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).json({ error: msg })
        } else {
            console.error(err)
            res.status(500).send({ error: err })
        }
    }
}

const deletePost = async (req, res) => {
    try {
        // console.log(req.params.id)
        const pst = await Post.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (pst) {
            res.status(200).json(pst)
        }
        else {
            res.status(404).json({ err: `User not found for id: ${req.params.id}` })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const deletePostsByUserId = async (userId) => {
    try {
        const pst = await Post.deleteMany({ user: userId })
        console.log('deleted posts: ', pst)
        return pst
    } catch (err) {
        console.error(err)
    }
}

module.exports = { createPost, incrementLike, getPosts, getPostsByUserId, getPost, updatePost, deletePost, deletePostsByUserId, getLatestPostByUserId, addComment }