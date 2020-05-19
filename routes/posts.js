const express = require('express');
const verify = require('./verifytoken');

const router = express.Router()

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'random description'
        }
    })
})

module.exports = router