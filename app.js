const express = require('express');
const app = express();
const mysql = require('mysql');
//const moment = require('moment');
const passport = require('passport');
//const { Passport } = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const { authenticate } = require('passport');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('gomi_app', 'root', 'xquk59', {
  host: 'localhost',
  dialect: 'mysql'
});


class User extends Model {}
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING
}, { sequelize, modelName: 'user' });


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({
  secret: 'gomi',
  resave: true,
  saveUninitialized: false,
}));



//sql接続
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xquk59',
  database: 'gomi_app'
});


//接続エラーか成功か
connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});

//フォームからの値を受け取るために必要な定型文
app.use(express.urlencoded({extended: false}));

//静的ファイル
app.use(express.static("pubilc"));


app.get("/",(req,res) => {
  res.render("register.ejs");
});

app.get("/login",(req,res) => {
  res.render("login.ejs");
});

app.get("/mypage",(req,res) => {
  res.render("mypage.ejs");
});

app.get("/post", (req,res) =>{
  res.render("post.ejs");
});

app.get("/timeline",(req,res) =>{
  res.render("timeline.ejs");
});


//新規登録
app.post("/create", (req,res) => {
  const user_name = [req.body.user_name]
  const mail = [req.body.mail]
  const pass = [req.body.pass]
  const pre = [req.body.pre]
  const school_name = [req.body.school_name]
  connection.query(
    "INSERT INTO users SET ?", 
    {username:[user_name],
      email:[mail],
      password:[pass],
      prefecture:[pre],
      school_name:[school_name]
    },
    (err,results,fields) => {
      res.redirect("/login");
    }
  );
});


//ログイン
passport.use(new LocalStrategy(
        {
        usernameField: 'mail',
        passwordField: 'pass'
        },
  (username, password, done) =>{
    User.findOne({where :{email: username}})
    .then((user) => {
        if (!user) {
          return done(null, false, { message: 'メールアドレスが間違っています。' });
        }
        if (password !== user.password) {
          return done(null, false, { message: 'パスワードが間違っています。' });
        }
        return done(null, user);
    });
  }
));

// Session
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.serializeUser((user, done) => {
  done(null, user);
});
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

module.exports = passport;

app.post("/login", 
passport.authenticate('local', {
    successRedirect: '/mypage',
    failureRedirect: '/login',
    failureFlash: true ,
    }),
);




app.listen(3000);