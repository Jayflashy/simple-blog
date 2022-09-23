const  express = require('express');
const { userLogin, userRegister, userLogout } = require('../controller/authController');
const { createError } = require('../middleware/errorHandler');
const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
router.get('/logout', userLogout)

module.exports = router