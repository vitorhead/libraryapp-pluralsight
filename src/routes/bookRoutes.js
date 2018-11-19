const express = require('express')
const booksRouter = express.Router()
const bookController = require('../controllers/bookController')
const bookService = require('../services/goodreadsService')

function router(nav) {
    const { getIndex, getById } = bookController(bookService, nav)

    booksRouter.use((req, res, next) => {
        if (req.user) {
            next()
        }
        else {
            res.redirect('/')
        }
    })

    booksRouter.route('/')
        .get(getIndex)

    booksRouter.route('/:id')
        .get(getById)

    return booksRouter;
}

module.exports = router