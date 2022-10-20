const mongoose = require('mongoose')

const {Schema, model} = mongoose ;// import Schema & model

// User Schema
const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        minlength: [10, 'title must be more than 10 characters.'], 
        trim:true
    },
    body: {
        type: String,
        required: [true, 'Blog body is required'],
        minlength: [10, 'body must be more than 10 characters.'], 
    },
    slug: {
        type: String,
        required: [true, 'slug is required'],
        unique: true,
        trim:true
    },
    category: {
        type: String, 
        trim:true
    },
    tags: {
        type: String,
        trim:true
    },
    image: {
        type: String,
    },
    userId: {
        type: String,
        trim: true
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
const Blog = model("Blog", BlogSchema)

module.exports = Blog