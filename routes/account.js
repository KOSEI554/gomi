const express = require('express');
const router = express.Router();


router.get("/", (req,res) =>{
  const userName = req.session.username;
  const user = {username: userName}
  res.render("account",{user: user});

  //できてる
  // const user = {username:"七字"}
  // res.render("userpage",{
  //   user: user
  // });
});

module.exports = router;