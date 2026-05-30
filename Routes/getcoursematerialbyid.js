const express = require('express');
const db = require('../Database/db');
const router = express.Router();


router.post('/', (req, res) => {
    // console.log(req.body);

    const materialid = req.body.materialid;
    // console.log('material',material);

    const sqlquery = `select * from tbl_course_material m inner join tbl_course c on  m.course_id=c.course_id where m.material_id='${materialid}'`
    db.query(sqlquery, (err, sqlresult) => {
        if (err)
            console.log(err);
        else
        {
             res.send(sqlresult)
        }
    })
})

module.exports = router;