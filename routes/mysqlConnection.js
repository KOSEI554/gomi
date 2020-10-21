const mysql = require('mysql');

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

module.exports = connection;