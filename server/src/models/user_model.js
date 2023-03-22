const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('mongoose-bcrypt')

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    birthday: {
        type: Date,
        validate(val) {
            if (!validator.isDate(val)) {
                throw new Error(`Birthdate format is invalid. Format should be 'YYYY/MM/DD'. actual: ${val}`)
            }
        },
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error(`Email is invalid. email: ${val}`)
            }
        },
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        bcrypt: true
    },
    status: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    occupation: {
        type: String,
        trim: true
    },
    auth_level: {
        type: String,
        trim: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true })

UserSchema.plugin(bcrypt)
const User = mongoose.model('User', UserSchema)

module.exports = User