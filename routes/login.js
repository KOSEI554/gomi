const express = require('express');
const router = express.Router();
const connection = require('./mysqlConnection');


router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.post('/', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const query = 'SELECT id,username FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
  connection.query(query, function(err, rows) {
    const userId = rows.length? rows[0].id: false;
    const userName = rows.length? rows[0].username: false;
    if (userId) {
      req.session.user_id = userId;
      req.session.username = userName;
      res.redirect('/userpage');
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});






module.exports = router;