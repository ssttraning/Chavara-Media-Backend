const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const { token, password } = req.body;
    const sql = `UPDATE tbl_tutor SET tutor_password = ?, reset_token = NULL WHERE reset_token = ?`;
    db.query(sql, [password, token], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to insert type");
        }
        if (result.affectedRows === 0) {
            return res.status(400).send("Invalid token");
        }
        else {
            return res.status(200).send({
                message: "Password created successfully"
            });
        }
    })
})

module.exports = router;