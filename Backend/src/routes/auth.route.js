const express = require('express')
const authController = require('../controller/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')

const authRoute = express.Router()


authRoute.post('/register', authController.authRegister )

authRoute.post('/login', authController.authLogin )

authRoute.get('/get-me', identifyUser,authController.getMeController)

module.exports = authRoute