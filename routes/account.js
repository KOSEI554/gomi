const express = require('express');
const router = express.Router();


router.get("/", (req,res) =>{
  const userName = req.session.username;
  // const userId = req.session.user_id? req.session.user_id: 0; 
  // if(userId === null){
  //   res.redirect("/");
  // }
  const user = {username: userName}
  res.render("account",{user: user});
});




module.exports = router;