const  express = require('express');
const router = express.Router()

const foodRoute = require("./foodRoute");

router.use("/food", foodRoute);

module.exports = router