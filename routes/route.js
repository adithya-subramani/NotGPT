
const express = require("express");
const msgHandler = require("../controllers/msghandler");
const router = express.Router();

router.get("/getmsg/:msg", msgHandler.getReply);


module.exports = router;