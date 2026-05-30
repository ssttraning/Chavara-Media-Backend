const express = require('express')
const db = require('../Database/db')
const router = express.Router()

router.post('/', (req, res) => {
    const { categoryid } = req.body
    const sql = `delete from tbl_category where category_id='${categoryid}'`

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err)
        }
        else {
            return res.status(200).send({
                message: "deleted successfully"
            })
        }
    })
})

module.exports = router