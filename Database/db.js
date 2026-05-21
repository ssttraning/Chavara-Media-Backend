const mysql = require('mysql2');
const db = mysql.createPool({
    host:"n1nlmysql57plsk.secureserver.net",
    user:"chavaramedia",
    password:"b79Cmi49~",
    database:"chavaramedia"
})
module.exports=db;