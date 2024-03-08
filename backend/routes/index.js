const express = require('express')
const { getUsers, Register, login, Logout, Delete } = require("../controllers/Users.js");
// const{ verifyToken } = require ("../middleware/VerifyToken.js");
// const { refreshToken }= require ("../controllers/RefreshToken.js");
 
const router = express.Router();
 
router.get('/getUsers',  getUsers);
router.post('/users', Register);
router.post('/login', login);

router.post('/logout', Logout);
 
module.exports=router;