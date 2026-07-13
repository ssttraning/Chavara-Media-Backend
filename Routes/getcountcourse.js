const express = require('express');
const db = require('../Database/db');
const router = express.Router();

router.get('/', (req, res) => {

    const sql = `
       SELECT
    tbl_category.*,
    COUNT(tbl_course.course_category_id) AS course_count
FROM tbl_category
LEFT JOIN tbl_course
ON tbl_category.category_id = tbl_course.course_category_id
GROUP BY tbl_category.category_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;