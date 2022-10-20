const Blog = require("../models/blog")
const { createError } = require('../middleware/errorHandler');
const {createBlogValidation} = require('../utils/validation');
const { generateSlug } = require("../helper");

const createBlog = async (req, res, next) => {
    try {
        // generate blog
        const slug = generateSlug(req.body.title);
        // perform  validation
        const blog = await createBlogValidation.validateAsync(req.body);
        // create new blog
        const newBlog = new Blog({
            ... blog,  slug
        })
        console.log(newBlog)
        let savedBlog = await newBlog.save();
        console.log(savedBlog)
        res.status(201).json({status: "success", message:"Blog created successfully", data: savedBlog})

    } catch (error) {
        if (error.isJoi === true) error.status = 400;
        next(error)
    }
}

const editBlog = async (req, res, next) => {
    try{
        // validate requests

    } catch(error){
        next(error)
    }
}

module.exports = { createBlog, }