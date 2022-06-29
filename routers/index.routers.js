const express = require('express');
const router = express.Router();
const prodRoutes = require('./products/products.routes');
const userRoutes = require('./users/users.routes')
const authRoutes = require ('./auth/auth.routes')
const infoRoutes = require ('./info/info.routes')


//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))


//Routes
router.use('/products', prodRoutes)
router.use('/user', userRoutes)
router.use('/auth',authRoutes)
router.use ('/info', infoRoutes)


module.exports = router
