const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get("/",(req,res) =>{
  console.log(req.query);
  const postId = req.query.id;
  const query = `SELECT * FROM posts where id = ${postId}`
  connection.query(query, (err,post_rows) =>{
    const query = `SELECT * FROM comments where post_id = ${postId} ORDER BY created_at DESC`;
    connection.query(query,(err,comment_rows) =>{
    //console.log(rows);
      res.render('comment',{postList: post_rows, commentList: comment_rows});
    });
    // console.log(query);
    // console.log(rows);
  });
});

router.post("/", (req,res)=>{
  const userId = req.session.user_id? req.session.user_id: 0; 
  const postId = req.body.id;
  const comment = req.body.comment;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); 
  //console.log(comment);
  const query = 'INSERT INTO comments (user_id, post_id, comment, created_at) VALUES ("' + userId + '",'+'"' + postId + '", ' + '"' + comment + '","' + createdAt + '")';
  connection.query(query,(err,rows) =>{
    res.redirect(`/comment?id=${postId}`);
  });
});



module.exports = router;