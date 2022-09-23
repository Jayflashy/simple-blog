const express = require('express')
const morgan = require('morgan')
const cors = require("cors") 
require('dotenv').config()
const adminRoute = require('./src/routes/adminRoute')
const { notFound } = require('./src/middleware/errorHandler')
const cookieParser = require('cookie-parser')

const app = express()
app.use(morgan("dev")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

// routes
app.get("/", (req, res) => {
    res.json({ data: "hello there" });
});
app.use("/api/admin", adminRoute);

//Error Hand/ler
app.all('*', notFound)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

module.exports = app