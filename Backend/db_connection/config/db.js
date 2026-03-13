const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbshop"
});
db.connect((err) => {
    if (err) {
        console.error("Database conect failed:", err);
    } else {
        console.log("MySQL Connected...");
    }
});
module.exports = db; 
