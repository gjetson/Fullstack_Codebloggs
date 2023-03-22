const Post = require('../models/post_model')

const createPost = async (req, res) => {
    try {
        const usr = await Post.create(req.body)
        res.status(201).json(usr)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getPosts = async (req, res) => {
    try {
        const usrs = await Post.find({}).sort({ last_name: 1 })
        console.log(usrs)
        res.status(200).json(usrs)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const addLike = async (req, res) => {
    _updatePost(req.params.id, { '$inc': { likes: '1' } }, res)
}

const getPost = async (req, res) => {
    try {
        const usr = await Post.findById(req.params.id)
        res.status(200).json(usr)
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

const updatePost = async (req, res) => {
    _updatePost(req.params.id, req.body, res)
}

const _updatePost = async (id, body, res) => {
    try {
        console.log(body)
        const usr = await Post.findByIdAndUpdate(
            { _id: id },
            body,
            { new: true, upsert: false })
        if (usr) {
            res.status(201).json(usr)
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
        const usr = await Post.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (usr) {
            res.status(200).json(usr)
        }
        else {
            res.status(404).json({ err: `User not found for id: ${req.params.id}` })
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

module.exports = { createPost, addLike, getPosts, getPost, updatePost, deletePost }