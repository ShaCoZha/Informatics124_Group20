const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/TokenController");

router.post('/refreshToken', tokenController.authenticateToken);

module.exports = router;