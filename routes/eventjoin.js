const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get("/",(req,res) =>{
  const eventId = req.body.id
  const query = `SELECT * FROM events WHERE id = ${eventId}`
  connection.query(query, (err, event_rows) =>{
    const query = `SELECT * FROM participants WHERE event_id =${eventId} ORDER BY created_at DESC`;
    connection.query(query,(err,participant_rows) =>{
      //console.log(rows);
        res.render('eventjoin',{eventList: event_rows, participantList: participant_rows});
    })
  }); 
});

router.post("/", (req,res)=>{
  const userId = req.session.user_id? req.session.user_id: 0; 
  const eventId = req.body.id;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); 
  //console.log(comment);
  const query = 'INSERT INTO participants (user_id, event_id, created_at) VALUES ("' + userId + '",'+'"' + eventId + '","' + createdAt + '")';
  connection.query(query,(err,rows) =>{
    res.redirect(`/eventjoin?id=${eventId}`);
  });
});


module.exports = router;