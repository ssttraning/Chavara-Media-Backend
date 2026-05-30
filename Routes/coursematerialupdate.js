const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);
    const materialid = req.body.material_id
    const material = req.body.material;
    const description = req.body.material_description;

    const sql = `update tbl_course_material set material_description='${description}',material='${material}' where material_id='${materialid}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to update course");
        }
        else {
            return res.send({ message: 'material updated' })
        }
    })
})

module.exports = router;