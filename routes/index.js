const express = require('express')
const adminRoutes = require('./admin')
const shopRoutes = require('./shop')
const authRoutes = require('./auth')

const router = express.Router()

router.use('/admin', adminRoutes)
router.use(shopRoutes)
router.use(authRoutes)

module.exports = router