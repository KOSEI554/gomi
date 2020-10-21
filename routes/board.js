const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get('/:id', function(req, res, next) {
  const postId = req.params.id;
  const query = 'SELECT * FROM posts WHERE id = ' + postId;
  connection.query(query, function(err, post) {
    res.render('board', {
      title: post[0].message,
      board: post[0]
    });
  });
});

module.exports = router;