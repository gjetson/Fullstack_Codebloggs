const User = require('../models/user_model')
const SessionConn = require('./session_controller')
const PostConn = require('../controllers/post_controller')

const createUser = async (req, res) => {
    try {
        const usr = await User.create(req.body)
        res.status(201).json(usr)
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email === 1) {
            const msg = `Email: ${err.keyValue.email} is NOT unique! Cannot create user.`
            res.status(401).json(msg)
        } else {
            console.error(err)
            res.status(500).json(err)
        }
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const valid = await user.verifyPassword(req.body.password)
            if (valid) {
                await SessionConn.deleteSessionByUserId(user._id)
                const sesh = await SessionConn.createSessionByUserId(user._id)
                if (sesh) {
                    console.log('Session: ', sesh)
                    res.status(201).json({ user: user, session: sesh })
                }
            } else {
                res.status(401).json({})
            }
        }
        else {
            res.status(403).json(`user not found for '${req.body.username}'`)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getUsers = async (req, res) => {
    try {
        const usrs = await User.find({}).sort({ last_name: 1 })
        console.log(usrs)
        res.status(200).json(usrs)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getUsersByLimit = async (req, res) => {
    try {
        const usrs = await User.find({}).sort({ last_name: 1 }).limit(req.params.limit)
        console.log(usrs)
        res.status(200).json(usrs)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getUser = async (req, res) => {
    try {
        const usr = await User.findById(req.params.id)
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

const updateUser = async (req, res) => {
    try {
        console.log(req.params.id)
        const usr = await User.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, upsert: false })
        if (usr) {
            res.status(201).json(usr)
        }
        else {
            res.status(404).json({ err: `User not found for id: ${req.params.id}` })
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

const deleteUser = async (req, res) => {
    try {
        console.log(req.params.id)
        const pst = await PostConn.deletePostsByUserId(req.params.id)
        console.log('deleted posts: ', pst)
        const usr = await User.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (usr) {
            res.status(200).json(usr)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
}

module.exports = { createUser, loginUser, getUsers, getUsersByLimit, getUser, updateUser, deleteUser }