const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb

const dbURI = 'mongodb+srv://netNinja:netNinja123@cluster0.nlx1am2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURI)
.then((result) => app.listen(3000)
)
.catch((err) => console.log(err))


// Register view engine
app.set('view engine', 'ejs')

// mongoose and mongo sandbox
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    }); 

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})

// middleware & static files
app.use(express.static('public'))

app.use(morgan('dev'))

app.get('/', (req, res) => {
    // res.send('<p>Home page</p>')
    const blogs = [
        {title: 'I like boiled eggs', snippet: 'lorem ipsum'},
        {title: 'I like egg york', snippet: 'lorem ipsum'},
        {title: 'I like bananas', snippet: 'lorem ipsum'}
    ]

    res.render('index', { title: 'Home', blogs: blogs})
})

app.get('/about', (req, res) => {
    // res.send('<h1>About page</h1>')
    res.render('about', { title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create newr blog'})
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})