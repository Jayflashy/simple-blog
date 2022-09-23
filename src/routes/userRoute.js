const  express = require('express');
const { verifyToken, verifyUser } = require('../utils/authVerify');
const router = express.Router()

router.get('/', verifyToken, (req, res, next) => {
   res.send('user route')
})

module.exports = router