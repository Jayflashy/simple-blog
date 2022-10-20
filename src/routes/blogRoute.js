const  express = require('express');
const { createBlog } = require('../controller/blogController');
const { createError } = require('../middleware/errorHandler');
const { verifyToken } = require('../utils/authVerify');
const router = express.Router()

router.get('/', (req, res, next) => {
   res.send("Blog routes")
})

router.post('/blog', verifyToken, createBlog)


module.exports = router