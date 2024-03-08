const express = require('express')
// express app
const app = express();

// Register view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);

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