const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('./mysqlConnection');

router.get("/",(req,res) =>{
  res.redirect("edit");
});

router.get("/edit/:id",(req,res) => {
  const eventId = req.query.id;
  connection.query(
    `SELECT * FROM events where id = ${eventId}`,
    [req.params.id],
    (err, results) => {
      res.render("edit.ejs", {eventItem:results[0]});
    }
  );
});




module.exports = router;