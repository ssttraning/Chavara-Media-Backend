const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "n1nlmysql57plsk.secureserver.net",
    port: 3306,
    user: "chavaramedia",
    password:"b79Cmi49~",
    database: "chavaramedia",
    connectTimeout: 30000
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed:", err);
    } else {
        console.log("Connected!");
    }
    connection.end();
});