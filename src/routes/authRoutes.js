const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')

function router(nav) {
    const { postSignIn, postSignUp, getProfile, getSignIn } = authController(nav)
    authRouter.route('/signUp')
        .post(postSignUp)

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next()
            }
            else {
                res.redirect('/')
            }
        })
        .get(getProfile)

    authRouter.route('/signIn')
        .get(getSignIn)
        .post(postSignIn)

    return authRouter
}

module.exports = router;