const mongoose = require('mongoose')

const {Schema, model} = mongoose ;// import Schema & model

// User Schema
const UserSchema = new Schema({
    
    username: {type: String, unique: true, required: true, trim:true},
    password: {type: String, required: true, minlength:8, trim:true},
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [30, 'Username must be less than or equal to 10 characters.'], 
        trim:true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        trim:true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},
{
    timestamps: {
    }
})

// User model
const User = model("User", UserSchema)

module.exports = User