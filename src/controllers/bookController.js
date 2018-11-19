const { MongoClient, ObjectID } = require('mongodb')

function bookController(bookService, nav) {
    async function getIndex(req, res) {
        const url = 'mongodb://localhost:27017'
        const dbName = 'libraryApp'

        try {
            const client = await MongoClient.connect(url)
            const db = client.db(dbName)
            const response = await db.collection('books').find().toArray();
            res.render('bookListView', {
                title: 'Books',
                nav,
                books: response
            })
        } catch (e) {
            console.error('MongoDB error: ', e)
        }
        if (client)
            client.close()
    }

    async function getById(req, res) {
        const url = 'mongodb://localhost:27017'
        const dbName = 'libraryApp'
        const { id } = req.params;
        let book;

        try {
            const client = await MongoClient.connect(url)
            const db = client.db(dbName)
            book = await db.collection('books').findOne({ _id: new ObjectID(id) });
            if (client)
                client.close()
        } catch (e) {
            console.error('MongoDB error: ', e)
        }


        try {
            book.details = await bookService.getBookById(book.bookId)
        } catch (e) {
            console.error('Error while fetching book data: ', e)
        }

        res.render('bookView', {
            title: 'Books',
            nav,
            book
        })
    }

    return {
        getIndex,
        getById
    }
}

module.exports = bookController