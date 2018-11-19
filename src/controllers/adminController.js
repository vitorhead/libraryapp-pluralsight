const { MongoClient } = require('mongodb')

const books = [{
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Medieval fantasy',
    read: true,
    bookId: 33
},
{
    title: 'Flash Rebirth',
    author: 'DC Comics',
    genre: 'HQ',
    read: true,
    bookId: 6476516
},
{
    title: 'Thor Vikings',
    author: 'Marvel Studios',
    genre: 'HQ',
    read: true,
    bookId: 95400
}
]

function adminController(nav) {
    async function getIndex(req, res) {
        const url = 'mongodb://localhost:27017'
        const dbName = 'libraryApp'

        try {
            const client = await MongoClient.connect(url)
            const db = client.db(dbName)
            // const response = await db.collection('books').insertMany(books);
            res.json(books)
        } catch (e) {
            console.error('MongoDB error: ', e)
        }
        if (client)
            client.close()

    }

    return {
        getIndex
    }
}

module.exports = adminController