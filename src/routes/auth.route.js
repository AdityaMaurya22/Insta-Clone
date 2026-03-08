const express = require('express')
const authController = require('../controller/auth.controller')

const authRoute = express.Router()


authRoute.post('/register', authController.authRegister )

authRoute.post('/login', authController.authLogin )

module.exports = authRoute