const express = require('express')

const router = express.Router()

const { loginUser, SignupUser } = require('../controllers/userController')

//login
router.post('/login', loginUser)

//signup
router.post('/signup', SignupUser)

module.exports = router