const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/TokenController");

router.post('/refreshToken', tokenController.refreshToken);

module.exports = router;