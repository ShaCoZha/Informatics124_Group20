const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/TokenController");

const userController = require("../controllers/UserController");

router.post('/login', userController.login);
router.post('/createUser', userController.createUser);
router.get('/getUser', tokenController.authenticateToken, userController.getUser);

module.exports = router;