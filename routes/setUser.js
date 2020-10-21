const connection = require('./mysqlConnection');

module.exports = function(req, res, next) {
  //console.log(req.session.user_id);
  const userId = req.session.user_id;
  //const userName = req.params.username;
  // const a = req.session;
  // const userName = {a:username}
  // const userName = req.session.username;
  //console.log(userName);
  if (userId) {
    //console.log(userId); //ok
    const query = 'SELECT id, username FROM users WHERE id = ' + userId ;
    //const query = 'SELECT id, username FROM users WHERE id, username = '+userId, +userName; 
    connection.query(query, function(err, results) {
      //console.log(query);
      //console.log(results);
      //console.log(err);
      if (!err) {
        res.locals.user = results.length? results[0]: false;
      }
    });
  }
  next();
};



