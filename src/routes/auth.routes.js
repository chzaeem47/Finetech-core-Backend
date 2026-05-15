const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router();


/**
 * REGISTER A NEW ACCOUNT USER ACCOUNT
 * /api/auth/register
 */
router.post('/register' ,authController.userRegister)

/**
 * LOGIN TO USER ACCOUNT
 * /api/auth/login
 */
router.post('/login' , authController.loginUser)

module.exports = router