const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get('/:board_id', function(req, res, next) {
  const boardId = req.params.board_id;
  const getBoardQuery = 'SELECT * FROM boards WHERE id = ' + boardId;
  const getMessagesQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM posts WHERE board_id = ' + boardId;
    connection.query(getBoardQuery, function(err, board) {
    connection.query(getMessagesQuery, function(err, message) {
      res.render('board', {
        title: board[0].title,
        board: board[0],
        postsList: message
      });
    });
  });
});

router.post('/:board_id', function(req, res, next) {
  const message = req.body.message;
  //console.log("そう？");
  const boardId = req.params.board_id;
  //console.log(boardId);
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = 'INSERT INTO posts (message, board_id, created_at) VALUES ("' + message + '", ' + '"' + boardId + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows) {
    res.redirect('/boards/' + boardId);
  });
})



module.exports = router;