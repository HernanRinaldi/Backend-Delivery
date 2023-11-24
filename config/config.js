
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'password',
    database:'db_delivery'
});

db.connect(function(error){
    if(error)throw new Error('Error connecting to db_delivery');
    console.log('DATA BASE CONNECTED!!')
})

module.exports = db;