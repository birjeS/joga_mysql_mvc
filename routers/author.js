const express = require('express')
const router = express.Router()
const articleController = require('../controllers/author')

router.get('/:author_id', articleController.getAuthorArticles)

module.exports = router