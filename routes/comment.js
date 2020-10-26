const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get("/",(req,res) =>{
  //console.log(req.query);
  const postId = req.query.id;
  const query = `SELECT * FROM posts where id = ${postId}`
  connection.query(query, (err,post_rows) =>{
    //console.log(post_rows);
    const query = `SELECT comments.*,users.username AS user_name FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = ${postId}`;
    // const query = "SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id";
    connection.query(query, (err,comment_rows) =>{
      console.log(comment_rows);
      res.render('comment',{postList: post_rows, commentList: comment_rows});
    });
    // console.log(query);
    // console.log(rows);
  });
});

// router.get("/", (req,res) =>{
//   const userId = req.session.user_id? req.session.user_id: 0; 
//   const postId = req.body.id;
//   const comment = req.body.comment;
//   const query = "SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id";
// });

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