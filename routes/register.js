const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get('/', (req, res) =>{
  res.render('register');
});


router.post('/', (req, res) =>{
  const username = req.body.user_name;
  const email = req.body.email;
  const password = req.body.pass;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1';
  const registerQuery = 'INSERT INTO users (username, email, password, createdAt) VALUES ("' + username + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")';
  connection.query(emailExistsQuery, (err, email)=> {
    var emailExists = email.length;
    if (emailExists) {
      res.render('register', {
        title: '新規会員登録',
        emailExists: '既に登録されているメールアドレスです'
      });
    } else {
      connection.query(registerQuery, (err, rows)=> {
        res.redirect('/');
      });
    }
  });
});


module.exports = router;
