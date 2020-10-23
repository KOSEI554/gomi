const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'node',
  password: 'KOSEi5464!',
  database: 'gomi_app'
});

//接続エラーか成功か
connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});



module.exports = connection;