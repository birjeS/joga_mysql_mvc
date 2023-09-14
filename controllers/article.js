const Article = require('../models/article.model.js')

// show all articles - index page
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
const getArticleBySlug = (req,res) => {
    Article.getBySlug(req.params.slug,(err,data)=>{
        if (err){
            res.status(500).send({
                message:err.message||'Some error occurred retrieving the data'
            })
        } else {
            console.log(data)
            res.render('article',{
                article:data
            })
        }
    })
}

//export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
}