const mysql = require('mysql2');
const db = mysql.createPool({
    host:"n1nlmysql57plsk.secureserver.net",
    user:"chavaramediaNew",
    password:"wJz9@00j7",
    database:"chavaramediaNew"
})
module.exports=db;