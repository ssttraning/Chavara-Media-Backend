const express = require('express');
const db = require('../Database/db');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {

    const tutorid = req.body.tutorid;
    const token = crypto.randomBytes(32).toString('hex');

    const updateQuery = `
        UPDATE tbl_tutor
        SET tutor_status = 'Approved',
            reset_token = ?
        WHERE tutor_id = ?
    `;

    db.query(updateQuery, [token, tutorid], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to update");
        }

        const selectQuery = `
            SELECT *
            FROM tbl_tutor
            WHERE tutor_id = ?
        `;

        db.query(selectQuery, [tutorid], async (err, tutorResult) => {

            if (err) {
                console.log(err);
                return res.status(500).send("Failed to fetch tutor");
            }

            if (tutorResult.length === 0) {
                return res.status(404).send("Tutor not found");
            }

            const tutor = tutorResult[0];

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aswanyghosh716@gmail.com',
                    pass: 'wivpgqiedhevjoui'
                }
            });

            const createPasswordLink =
                `http://localhost:5173/create-password/${token}`;

            try {

                await transporter.sendMail({
                    from: 'aswanyghosh716@gmail.com',
                    to: tutor.tutor_email,
                    subject: 'Tutor Application Approved',
                    html: `
                        <h2>Congratulations ${tutor.tutor_name}</h2>

                        <p>Your tutor application has been approved.</p>

                        <p>
                            Click the button below to create your password:
                        </p>

                        <a
                            href="${createPasswordLink}"
                            style="
                                background:#28a745;
                                color:white;
                                padding:10px 20px;
                                text-decoration:none;
                                border-radius:5px;
                            "
                        >
                            Create Password
                        </a>

                        <p>
                            If the button doesn't work, copy this link:
                        </p>

                        <p>${createPasswordLink}</p>
                    `
                });

                return res.status(200).send({
                    message: 'Tutor approved'
                });

            } catch (mailError) {

                console.log(mailError);

                return res.status(500).send({
                    message: 'Tutor approved but email failed'
                });
            }

        });

    });

});

module.exports = router;