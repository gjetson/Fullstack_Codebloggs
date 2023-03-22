const Comment = require('../models/comment_model')

const createComment = async (req, res) => {
    try {
        const usr = await Comment.create(req.body)
        res.status(201).json(usr)
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

const getComment = async (req, res) => {
    try {
        const usr = await Comment.findById(req.params.id)
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

const updateComment = async (req, res) => {
    try {
        console.log(req.params.id)
        const usr = await Comment.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, upsert: false })
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

module.exports = { createComment, getComments, getComment, updateComment, deleteComment }