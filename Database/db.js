const mysql = require('mysql2');
console.log("Connectiong to :n1nlmysql57plsk.secureserver.net");

const db = mysql.createPool({
    host:"n1nlmysql57plsk.secureserver.net",
    user:"chavaramedia",
    password:"b79Cmi49~",
    database:"chavaramedia"
})
module.exports=db;