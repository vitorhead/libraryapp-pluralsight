const passport = require('passport')
require('./strategies/local.strategy')()

function config(app) {
    app.use(passport.initialize())
    app.use(passport.session())
    //Stores the user in a session
    passport.serializeUser((user, done) => {
        //err, result callback style
        done(null, user)
    })

    //Retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user)
    })


}

module.exports = config 