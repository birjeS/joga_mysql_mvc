//db connection
const con = require('../utils/db');

//constructor
const Article = (article) => {
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.autor_id = article.autor_id
}

//get all articles
Article.getAll = (result) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query,(err,res) => {
        if (err) {
            console.log("error: ", err);
            result (err, null);
            return;
        }

        articles = res
        console.log("articles: ", articles);
        result(null, articles);
    })
};


//get article by slug
Article.getBySlug = (slug, result) => {
    let query =
        `SELECT article.*,
        author.name AS authorName
        FROM article 
        INNER JOIN author
        ON article.author_id = author.id
        WHERE slug="${slug}"`
    let article
    con.query(query,(err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found article: ", res[0]);
            result(null, res[0]);
        }
    });
}

module.exports = Article;