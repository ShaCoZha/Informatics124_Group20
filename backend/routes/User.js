const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/TokenController");

const userController = require("../controllers/UserController");

router.get('/getUserProfile', tokenController.authenticateToken, userController.getUserProfile);

router.post('/login', userController.login);
router.post('/createUser', userController.createUser);
router.post('/updateUserProfile', tokenController.authenticateToken, userController.updateUserProfile);


module.exports = router;