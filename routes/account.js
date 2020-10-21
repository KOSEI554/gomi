const express = require('express');
const router = express.Router();


router.get("/", (req,res) =>{
  const userName = req.session.username;
  const user = {username: userName}
  res.render("account",{user: user});
});




module.exports = router;