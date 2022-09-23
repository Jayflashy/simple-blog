const  express = require('express');
const { createError } = require('../middleware/errorHandler');
const router = express.Router()

router.get('/', (req, res, next) => {
    return next(createError(401, "You are not authenticated!"));
})



module.exports = router