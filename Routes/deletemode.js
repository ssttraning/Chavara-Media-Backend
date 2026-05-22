const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    console.log(req.body)

    const { modeid } = req.body

    console.log(modeid, "modeid")

    console.log(modeid, "modeid")
    const sql = `delete from tbl_mode where mode_id='${modeid}'`;
    db.query(sql, (err, result) => {
        if (err) {
           console.log(err)

            return res.status(400).send({
                message: "Database error",
                error: err
            })
        }
        else {
            console.log(result)

        return res.status(200).send({
            message: "deleted successfully"
        })

        }
    })
})

module.exports = router;