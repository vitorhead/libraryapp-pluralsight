const { MongoClient } = require('mongodb')
const passport = require('passport')

function authController(nav) {
    async function postSignUp(req, res) {
        //create user, req.login comes from passport
        const { username, password } = req.body
        const url = 'mongodb://localhost:27017'
        const dbName = 'libraryApp'

        try {
            const client = await MongoClient.connect(url)
            const db = client.db(dbName)
            const collection = db.collection('users')
            const user = { username, password }
            const result = await collection.insertOne(user)
            console.log('inserted ', result.ops[0])
            req.login(result.ops[0], () => {
                res.redirect('/auth/profile')
            })
        } catch (e) {
            console.error('MongoDB error: ', e)
        }
        if (client)
            client.close()
    }

    function getProfile(req, res) {
        //passport attaches the user in the request object
        res.send('hey ' + JSON.stringify(req.user))
    }

    function getSignIn(req, res) {
        res.render('signIn', {
            nav,
            title: 'Sign In!'
        })
    }

    function postSignIn(req, res, next) {
        const result = passport.authenticate('local', {
            // successRedirect: '/auth/profile',
            successRedirect: '/books',
            failureRedirect: '/'
        })
        result(req, res, next)
    }

    return {
        postSignIn,
        postSignUp,
        getProfile,
        getSignIn
    }
}

module.exports = authController