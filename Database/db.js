const mysql = require('mysql2');
const db = mysql.createPool({
    host: "n1nlmysql57plsk.secureserver.net",
    port: 3306,
    user: "chavaramedia",
    password: "b79Cmi49~",
    database: "chavaramedia",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000
})

db.getConnection((err, conn) => {
    if (err) {
        console.error("MYSQL CONNECTION FAILED");
        console.error(err);
    } else {
        console.log("MYSQL CONNECTED");
        conn.release();
    }
});

module.exports = db;