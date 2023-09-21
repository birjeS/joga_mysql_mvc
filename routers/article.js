const express = require('express');
//get using express router
const router = express.Router();
//define article controller and export it for this file
const articleController = require('../controllers/article');

//use controller functions according to the route
router.get('/' , articleController.getAllArticles);
router.get ('/:slug', articleController.getArticleBySlug);
router.get('/article/create', articleController.showNewArticleForm);
router.post('/create', articleController.createNewArticle);
router.get('/edit/:id', articleController.editArticle);
router.post('/edit/:id', articleController.updateArticle);
//export article router for using in default application file
module.exports = router;