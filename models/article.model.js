//db connection
const con = require('../utils/db');

//constructor
const Article = function (article) {
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
Article.getById = (id, result) => {
let query = `SELECT article.id AS id, article.name AS name, article.slug AS slug, article.image AS image, article.body AS body, article.published AS published, author.name AS author, author.id AS author_id FROM article INNER JOIN author ON article.author_id = author.id WHERE article.id = '${id}'`;
con.query(query, (err, res) => {
    if (err) {
        console.log("error: ", err)
        result (err, null)
        return
    }
    if (res.length) {
        console.log("found article: " + res[0])
        result(null, res[0])
    }
})
}


Article.createNew = (newArticle, result) => {
    let query = `INSERT INTO article (name, slug, image, body, published, author_id) VALUES ("${newArticle.name}", "${newArticle.slug}", "${newArticle.image}", "${newArticle.body}", "${newArticle.published}", ${newArticle.author_id})`
    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('created article: ', {id: res.insertId, ...newArticle})
        result(null, {id: res.insertId, ...newArticle})
    })
}
Article.showArticle = (articleId, result) => {
    let articleQuery = `SELECT * FROM article WHERE id = "${articleId}"`
    let authorQuery = `SELECT * FROM author`
    let article
    let authors = []

    con.query(articleQuery, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        article = res
        console.log('article: ', article)

        con.query(authorQuery, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }
            authors = res
            console.log('authors: ', authors)
            result(null, article, authors)
        })
    })
}

Article.editArticle = (articleId, editedArticle, result) => {
    let query = `UPDATE article SET name = "${editedArticle.name}", slug = "${editedArticle.slug}", image = "${editedArticle.image}", body = "${editedArticle.body}", author_id = "${editedArticle.author_id}" WHERE id = ${articleId}`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('edited article: ', {id: res.insertId, ...editedArticle})
        result(null, {id: res.insertId, ...editedArticle})
    })
}

Article.deleteArticle = (articleId, result) => {
    let query = `DELETE FROM article WHERE id = "${articleId}"`

    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        console.log('deleted article: ', {id: res.insertId})
        result(null, {id: res.insertId})
    })
}

module.exports = Article;