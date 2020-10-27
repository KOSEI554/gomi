const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get("/",(req,res) =>{
  //console.log(req.query);
  //console.log("届いてる");
  const eventId = req.query.id
  const query = `SELECT * FROM events WHERE id = ${eventId}`
  connection.query(query, (err, event_rows) =>{
    //console.log(event_rows);
    const query = `SELECT participants.*,users.username AS user_name FROM participants INNER JOIN users ON participants.user_id = users.id WHERE participants.event_id = ${eventId}`;
    //console.log(query);
    connection.query(query,(err,participant_rows) =>{
      console.log(participant_rows);
        res.render('eventjoin',{eventList: event_rows, participantList: participant_rows});
    })
  }); 
});

router.post("/", (req,res)=>{
  const userId = req.session.user_id? req.session.user_id: 0; 
  const eventId = req.body.id; 
  //console.log(comment);
  const query = 'INSERT INTO participants (user_id, event_id) VALUES ("' + userId + '",'+'"' + eventId + '")';
  connection.query(query,(err,rows) =>{
    res.redirect(`/eventjoin?id=${eventId}`);
  });
});


module.exports = router;