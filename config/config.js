
const mysql = require('mysql2');

const db = mysql.createConnection({
    hostname: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db_delivery'
    
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;