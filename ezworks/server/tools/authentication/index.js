'use restrict'

const express = require('express')
const router = express.Router();
const controller = require('./auth_mlk')

router.post('/sign_key', controller.sign_key )

module.exports = router
