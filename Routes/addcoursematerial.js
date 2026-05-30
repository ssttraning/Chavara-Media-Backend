const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const courseid = req.body.courseid;
    const material_type = req.body.material_type;
    const description = req.body.description;
    const uploaddate = new Date();
    const material = req.body.material;


    const sql = "insert into tbl_course_material(material_type,material_description,material_uploaddate,material,course_id) values(?,?,?,?,?)";
    db.query(sql, [material_type, description, uploaddate, material, courseid], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Failed to insert material");
        }
        else {
            res.send('Material inserted')
        }
    })
})

module.exports = router;