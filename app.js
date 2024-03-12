const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

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
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     }); 

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/all-blogs', (req, res)=> {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res)=> {
//     Blog.findById('65eecb0883539804d0341750')
//         .then((result)=> {
//             res.send(result)
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
// })

// middleware & static files

app.use(express.static('public'))
app.use(express.urlencoded( { extended: true }))

app.use(morgan('dev'))

app.get('/', (req, res) => {
   res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<h1>About page</h1>')
    res.render('about', { title: 'About'})
})


// blog routes
app.use(blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})