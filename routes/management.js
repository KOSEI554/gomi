const express = require('express');
const router = express.Router();
const connection = require('./mysqlConnection');

router.get('/', (req, res, next) =>{
  const userId = req.session.user_id? req.session.user_id: 0; 
  const query = `SELECT * FROM events where user_id = ${userId} ORDER BY created_at desc`
  connection.query(query, function(err, rows) {
    res.render('management',{eventList: rows});
  });
});

router.post("/",(req,res)=>{

});


module.exports = router;