//db connection
const con =require('../utils/db');

//constructor

const Author = (author) => {
    this.name = author.name
    this.author_id = author.id
};

Author.getName = (author_id, result) => {
    let article_query = `SELECT * FROM article, author WHERE author.id='${author_id}' AND article.author_id=author.id;`

    let author_query = `SELECT name FROM author WHERE author.id= ${author_id}`;

    let author
    let articles = []

    con.query (article_query,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        articles = res
        console.log("articles: ", articles);

        con.query(author_query, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }
            author = res
            console.log('author: ', author)
            result(null, author, articles)
        })
    })
};
module.exports = Author;