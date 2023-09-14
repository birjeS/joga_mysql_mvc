const Article = require('../models/article.model.js')

// show all articles index page
const getAllArticles = (req,res) => {
    Article.getAll((err,data) => {
            if (err) {
                res.status(500).send({
                    message : err.message || 'Some error occurred retrieving articles data'
                })
            } else {
                console.log(data)
                res.render('index',{
                    articles:data
                })
            }
        })
};

//show article by this slug
const getArticleSlug = (req, res) => {
    let query = `SELECT *,
                article.name as article_name,
                author.name as author_name
                FROM article
                INNER JOIN author
                ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    })
}

module.exports = {
    getAllArticles,
    getArticleSlug
}