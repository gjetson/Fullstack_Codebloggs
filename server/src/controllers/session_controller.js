const Session = require('../models/session_model')
const { v4: uuidv4 } = require('uuid')

const createSession = async (req, res) => {
    try {
        const sesh = await createSessionByUserId(req.body.userId)
        if (sesh) {
            res.status(201).json(sesh)
        } else {
            throw new Error('Session not created.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const createSessionByUserId = async (userId) => {
    const seshFoo = {
        token: uuidv4(),
        user: userId
    }
    console.log(seshFoo)
    const sesh = await Session.create(seshFoo)
    return sesh
}

const getSessionByUserId = async (userId) => {
    try {
        return await Session.findOne({ user: userId })
    } catch (err) {
        console.error(err)
    }
}

const deleteSessionByUserId = async (userId) => {
    try {
        return await Session.deleteOne({ user: userId })
    } catch (err) {
        console.error(err)
    }
}

const authenticateSession = async (req, res) => {
    try {
        const sesh = await Session.findOne({ token: req.params.token })
        if (sesh) {
            res.status(200).json(sesh)
        }
        else {
            res.status(401).json({})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getSessions = async (req, res) => {
    try {
        const sesh = await Session.find({}).populate('user')
        console.log(sesh)
        res.status(200).json(sesh)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getSessionByToken = async (req, res) => {
    try {
        console.log('token: ', req.params.token)
        const sesh = await Session.findOne({ token: req.params.token }).populate('user')
        console.log(sesh)
        if (sesh) {
            res.status(200).json(sesh)
        } else {
            console.log('400')
            res.status(400).json({ token: req.params.token })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const deleteSession = async (req, res) => {
    try {
        const sesh = await Session.findByIdAndDelete(req.params.id)
        if (sesh) {
            sesh.status(200).json(sesh)
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

module.exports = { createSession, createSessionByUserId, getSessionByUserId, authenticateSession, getSessions, getSessionByToken, deleteSession, deleteSessionByUserId }