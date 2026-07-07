const express = require('express');
const db = require('../Database/db');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
    console.log("SMTP DNS:", addresses);
});

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
               host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
            });

            const createPasswordLink =
                `https://chavaramedia.com/create-password/${token}`;

            try {
                // console.log("EMAIL_USER:", process.env.EMAIL_USER);
                // console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
                // transporter.verify(function (error, success) {
                //     if (error) {
                //         console.log("SMTP Verify Error:", error);
                //     } else {
                //         console.log("SMTP Server is ready");
                //     }
                // });
                await transporter.sendMail({
                   from: '"Chavara Media" <chavaramedia2020@gmail.com>',
                    to: tutor.tutor_email,
                    subject: 'Tutor Application Approved',
                    html: `
<div style="
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f5f7fa;
    padding: 30px 15px;
">

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="max-width: 650px; margin: auto; background: #ffffff; border: 1px solid #e5e7eb;"
    >

        <!-- Header -->
        <tr>
            <td
                style="
                    background: #003366;
                    padding: 25px;
                    text-align: center;
                "
            >
                <h1 style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 24px;
                ">
                    Chavara Media
                </h1>

                <p style="
                    margin: 8px 0 0;
                    color: #dbeafe;
                    font-size: 14px;
                ">
                    Tutor Registration Approval
                </p>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 40px;">

                <h2 style="
                    margin-top: 0;
                    color: #111827;
                    font-size: 22px;
                ">
                    Dear ${tutor.tutor_name},
                </h2>

                <p style="
                    color: #4b5563;
                    line-height: 1.8;
                    font-size: 15px;
                ">
                    We are pleased to inform you that your tutor application has been approved.
                </p>

                <p style="
                    color: #4b5563;
                    line-height: 1.8;
                    font-size: 15px;
                ">
                    To activate your account, please create a password using the link below.
                </p>

                <div style="text-align:center; margin:35px 0;">
                    <a
                        href="${createPasswordLink}"
                        style="
                            background-color: #003366;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 12px 28px;
                            font-size: 15px;
                            font-weight: bold;
                            border-radius: 4px;
                            display: inline-block;
                        "
                    >
                        Create Password
                    </a>
                </div>

                <p style="
                    color: #4b5563;
                    font-size: 14px;
                    line-height: 1.7;
                ">
                    If the button above does not work, copy and paste the following URL into your browser:
                </p>

                <p style="
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    padding: 12px;
                    word-break: break-all;
                    font-size: 13px;
                    color: #2563eb;
                ">
                    ${createPasswordLink}
                </p>

                <p style="
                    color: #4b5563;
                    line-height: 1.8;
                    font-size: 14px;
                    margin-top: 30px;
                ">
                    For security reasons, this link should be used only by the intended recipient.
                    If you did not request this account, please ignore this email.
                </p>

                <p style="
                    margin-top: 30px;
                    color: #111827;
                    font-size: 15px;
                ">
                    Regards,<br>
                    <strong>Chavara Media Team</strong>
                </p>

            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td
                style="
                    background: #f9fafb;
                    border-top: 1px solid #e5e7eb;
                    padding: 20px;
                    text-align: center;
                    color: #6b7280;
                    font-size: 12px;
                "
            >
                © 2026 Chavara Media. All rights reserved.
            </td>
        </tr>

    </table>

</div>
`
                });

                return res.status(200).send({
                    message: 'Tutor approved'
                });

            } catch (mailError) {
                console.error("Mail Error:", mailError);

                return res.status(500).json({
                    message: "Tutor approved but email failed",
                    error: mailError.message,
                    code: mailError.code
                });
            }

        });

    });

});

module.exports = router;