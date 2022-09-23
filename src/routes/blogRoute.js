const  express = require('express');
const { createError } = require('../middleware/errorHandler');
const router = express.Router()

router.get('/', (req, res, next) => {
   res.send("Blog routes")
})



module.exports = router