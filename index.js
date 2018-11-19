const express = require('express');
const morgan = require('morgan'); // print each request in the terminal
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//config
const app = express();
const port = process.env.PORT || 3000;
const nav = [{
    link: '/books',
    title: 'Books'
}];

//routes
const booksRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)
const authRouter = require('./src/routes/authRoutes')(nav)

app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: 'libraryApp' }))

require('./src/config/passport.js')(app)

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs')


// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.use('/books', booksRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.get('/', (req, res) => res.render('index', {
    title: "Library",
    nav: [{
        link: '/books',
        title: 'Books'
    }]
}));

app.listen(port, () => console.log(`...Listening on port ${port}...`));