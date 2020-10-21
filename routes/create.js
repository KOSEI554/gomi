const express = require('express');
const router = express.Router();
const moment = require('moment');
const path = require("path");
const connection = require('./mysqlConnection');

// //投稿表示
// router.get('/event', (req, res, next) =>{
//   const query = 'SELECT E.id, E.user_id, E.date, E.prefecture, E.concept, E.img_url, ifnull(U.username, \'名無し\') AS eventname, DATE_FORMAT(E.created_at, \'%Y年%m月%d日 %k時%i分\') AS created_at FROM events E LEFT OUTER JOIN users U ON E.user_id = U.id ORDER BY E.created_at DESC'; 
//   connection.query(query, function(err, rows) {
//     res.render('event',{eventList: rows});
//   });
// });


//投稿
router.get("/",(req,res) => {
  res.render("create");
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
  // console.log("届いてる");
  const userId = req.session.user_id? req.session.user_id: 0; 
  const eventname = req.body.eventname;
  const date = req.body.date;
  const time = req.body.time;
  const prefecture = req.body.prefecture;
  const concept = req.body.concept;
  const image = req.files.images;
  const ext = path.extname(image.name);
  const img_url = `${image.md5}${ext}`;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); 
  // console.log(img_url);
  // console.log(concept);
  // console.log(prefecture);
  // console.log(createdAt);
  const query = 'INSERT INTO events (user_id, date, time, eventname, prefecture, concept, img_url, created_at) VALUES ("' + userId + '",'+'"' + date + '",'+'"' + time + '", ' + '"' + eventname + '", ' + '"' + prefecture + '", ' + '"' + concept + '", ' + '"' + img_url + '","' + createdAt + '")';
  // const query = 'INSERT INTO events (user_id,  date, eventname, prefecture, concept, img_url, created_at) VALUES ("' + userId + '",' + '"' + eventname + '", ' + '"' + date + '", ' + '"' + prefecture + '", ' + '"' + concept + '", ' + '"' + img_url + '","' + createdAt + '")';
  console.log(query);
  connection.query(query, function(err, rows) {
    res.redirect('/event');
  });
});


module.exports = router;