// Application packages
const express = require('express');
const app = express();
const path = require('path');

// Add template engine
const hbs = require('express-handlebars');

// Setup template engine directory and file extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts/')
}));

//setup static public directory
app.use(express.static('public'));

const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Create database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to joga_mysql_db");
});

//import article route
const articleRoutes = require('./routers/article');
const authorRoutes = require('./routers/author');
//
// //to use article routes
app.use('/' , articleRoutes);
app.use ('/article' , articleRoutes)
app.use ('/author' , authorRoutes)


// Show author's articles by author_id
app.get('/author/:author_id', (req, res) => {
    const authorId = req.params.author_id;

    // Päring autori nime saamiseks
    const authorQuery = `SELECT name FROM author WHERE id = ${authorId}`;

    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;

        // Päring autori artiklite saamiseks
        const articlesQuery = `SELECT * FROM article WHERE author_id = ${authorId}`;

        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;

            const authorName = authorResult[0].name;
            const authorArticles = articlesResult;

            // Render 'author' template with author's name and articles
            res.render('author', { authorName, authorArticles });
        });
    });
});

// Start the Express app
app.listen(3000, () => {
    console.log('App is started at http://localhost:3000');
});