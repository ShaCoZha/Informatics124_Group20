const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/TokenController");

router.post('/refreshToken', tokenController.refreshToken);
router.post('/verifyRefreshToken', tokenController.verifyRefreshToken);

module.exports = router;