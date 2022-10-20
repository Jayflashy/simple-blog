const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user")
const { createError } = require('../middleware/errorHandler');
const {registerValidation, loginValidation} = require('../utils/validation')

const userLogin = async (req, res, next) => {
    try {
        const body = await loginValidation.validateAsync(req.body);
        // check if user exists 
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!, check your username"));
        // check is password is correct
        const correctPassword= await bcrypt.compare(body.password, user.password );
        if (!correctPassword)
            return(createError(400, "Wrong password or username!"));
        // logg user in
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET);
        // user data        
        const { password, isAdmin, ...otherDetails } = user._doc;
        console.log(otherDetails)
        res.cookie("auth_token", token, {httpOnly:true,maxAge:3600000 * 24 * 2}).status(200).send("login successful.");

    } catch (error) {
        if (error.isJoi === true) error.status = 400;
        next(error)
    }
}

const userRegister = async (req, res, next) => {
    try {
        // perform  alidation
        const user = await registerValidation.validateAsync(req.body);
        // create new user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const newUser = new User({
            ...user,
            password: hash,
        })
        let savedUser = await newUser.save();

        // log new user in
        const token = jwt.sign({id:savedUser._id, isAdmin:savedUser.isAdmin}, process.env.JWT_SECRET);
        console.log("new user registered")
        res.cookie("auth_token", token, {httpOnly:true,maxAge:3600000 * 24 * 2}).status(200).send("Registration successful.");

    } catch (error) {
        if (error.isJoi === true) error.status = 400;
        next(error)
    }
}

const userLogout = async (req,res,next) => {
    try{
        // check if token exist and delete
        const token = req.cookies.auth_token;
        if (!token) {
            return (createError(401, "youre not authenticated"))
        }
        // delete token and log user out
        res.clearCookie("auth_token").status(201).send("logged out successful")
    }catch(error){
        next(error)
    }
}

module.exports = {userLogin, userRegister, userLogout}