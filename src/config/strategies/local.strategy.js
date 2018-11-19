const passport = require('passport')
const { Strategy } = require('passport-local')
const { MongoClient } = require('mongodb')

function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {

            //go to db, validate password, pull the user, etc
            const url = 'mongodb://localhost:27017'
            const dbName = 'libraryApp'
            try {
                const client = await MongoClient.connect(url)
                const db = client.db(dbName)
                const collection = db.collection('users')
                const user = await collection.findOne({ username })

                if (user) {
                    if (user.password === password) {
                        //return error and result which is the user object
                        done(null, { username, password })
                    } else {
                        done(null, false)
                    }
                }
                else {
                    done(null, false)
                }

            } catch (e) {
                console.error('MongoDB error: ', e)
            }
            if (client)
                client.close()
        }
    ))
}

module.exports = localStrategy