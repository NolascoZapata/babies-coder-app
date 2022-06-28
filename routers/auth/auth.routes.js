const express = require('express');
const passport = require('./../../middlewares/passport')

const router = express.Router();  

router.post(
    '/register',
    passport.authenticate('signup',{failureRedirect:'/signup-error'}), async (req, res, next) => res.redirect('/home'));

router.post(
    '/login',
    passport.authenticate('signin',{failureRedirect:'/signin-error'}), async (req, res, next) =>res.redirect('/home'));

module.exports = router;