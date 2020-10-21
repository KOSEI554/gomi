const express = require('express');
const router = express.Router();
const moment = require('moment');
const multer = require('multer');
const path = require("path");
const connection = require('./mysqlConnection');

// const cloudinary = require('cloudinary');
// cloudinary.config({
//   cloud_name: 'gomi',
//   api_key: 'gomi',
//   api_secret: 'gomi'
// });
//const fs  = require("fs");




router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン'
    });
  }
});

//トップページ
router.get("/toppage", (req,res) =>{
  res.render("toppage");
});

router.get("/userpage", (req,res) =>{
  const userName = req.session.username;
  const user = {username: userName}
  res.render("userpage",{user: user});

  //できてる
  // const user = {username:"七字"}
  // res.render("userpage",{
  //   user: user
  // });
});

//投稿表示
router.get('/timeline', (req, res, next) =>{
  const query = 'SELECT P.id, P.user_id, P.message, P.img_url, ifnull(U.username, \'名無し\') AS username, DATE_FORMAT(P.created_at, \'%Y年%m月%d日 %k時%i分\') AS created_at FROM posts P LEFT OUTER JOIN users U ON P.user_id = U.id ORDER BY P.created_at DESC'; 
  connection.query(query, function(err, rows) {
    res.render('timeline',{postList: rows});
  });
});


//投稿
router.get("/post",(req,res) => {
  res.render("post");
})

router.post('/', (req, res, next)=> {
  if (req.files == null) {
    return res.status(400).send('画像が選択されていません');
  }else{
    const image = req.files.images;
    const ext = path.extname(image.name);
    //console.log(image);
    image.mv(`./public/images/${image.md5}${ext}` , function(err){
      if(err)
        return res.status(500).send(err);
    })
  }
  const userId = req.session.user_id? req.session.user_id: 0; 
  const message = req.body.message;
  //console.log(message);//ok
  const image = req.files.images;
  const ext = path.extname(image.name);
  const img_url = `${image.md5}${ext}`;
  //console.log(img_url);//ok
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); 
  // console.log(message);
  // console.log(createdAt);
  const query = 'INSERT INTO posts (user_id, message, img_url, created_at) VALUES ("' + userId + '",'+'"' + message + '", ' + '"' + img_url + '","' + createdAt + '")';
  // console.log(query);
  connection.query(query, function(err, rows) {
    res.redirect('/timeline');
  });
});


//イベント投稿表示
router.get('/event', (req, res, next) =>{
  const query = 'SELECT E.id, E.user_id, E.date, E.time, E.prefecture, E.concept, E.img_url, ifnull(U.username, \'名無し\') AS eventname, DATE_FORMAT(E.created_at, \'%Y年%m月%d日 %k時%i分\') AS created_at FROM events E LEFT OUTER JOIN users U ON E.user_id = U.id ORDER BY E.created_at DESC'; 
  connection.query(query, function(err, rows) {
    res.render('event',{eventList: rows});
  });
});


//ログインユーザーだけの投稿表示
router.get('/account', (req, res, next) =>{
  const userId = req.session.user_id? req.session.user_id: 0; 
  const query = `SELECT * FROM posts where user_id = ${userId} ORDER BY created_at desc`
  connection.query(query, function(err, rows) {
    res.render('account',{postList: rows});
  });
});

//コメント表示
router.get('/example', (req,res) =>{
  // const userId = req.session.user_id? req.session.user_id: 0;
  console.log('query', req.query);
  // const postId = req.query.id; 
  const query = `SELECT * FROM comments where post_id = ${postId}`;
  connection.query(query,(err,rows) =>{
  console.log(rows);
  res.render('comment',{postList: [{}], commentList: rows});
  });
});
// router.get("/comment",(req,res,next) =>{
//   //const userId = req.session.user_id? req.session.user_id: 0; 
//   const query = 'SELECT * FROM comments where id = 3';
//   connection.query(query,(err,rows)=>{
//     res.render("comment", {commentList: rows});
//   });
// });

module.exports = router;
