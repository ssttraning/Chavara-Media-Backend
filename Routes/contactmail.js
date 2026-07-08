const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {

    const { name, email, phone, comments } = req.body;
    console.log(name, email)
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 120000,
        greetingTimeout: 120000,
        socketTimeout: 120000
    });

    try {

        await transporter.sendMail({
            from: email,
            to: 'chavaramedia2020@gmail.com',
            subject: 'New Contact Form Message',
            html: `
<div style="
    background:#f4f7fb;
    padding:40px 20px;
    font-family:Arial, Helvetica, sans-serif;
">

    <div style="
        max-width:650px;
        margin:auto;
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        box-shadow:0 10px 35px rgba(0,0,0,0.08);
    ">

        <div style="
            background:linear-gradient(135deg,#2563eb,#1d4ed8);
            padding:35px;
            text-align:center;
            color:#fff;
        ">
            <h1 style="margin:0;font-size:28px;">
                📩 New Contact Enquiry
            </h1>

            <p style="
                margin-top:10px;
                opacity:.9;
                font-size:15px;
            ">
                A visitor has submitted a message through your website.
            </p>
        </div>

        <div style="padding:35px;">

            <div style="
                background:#f8fafc;
                border-radius:12px;
                padding:18px;
                margin-bottom:15px;
            ">
                <div style="
                    color:#6b7280;
                    font-size:13px;
                    margin-bottom:5px;
                ">
                    Full Name
                </div>

                <div style="
                    color:#111827;
                    font-size:17px;
                    font-weight:600;
                ">
                    ${name}
                </div>
            </div>

            <div style="
                background:#f8fafc;
                border-radius:12px;
                padding:18px;
                margin-bottom:15px;
            ">
                <div style="
                    color:#6b7280;
                    font-size:13px;
                    margin-bottom:5px;
                ">
                    Email Address
                </div>

                <div style="
                    color:#111827;
                    font-size:17px;
                    font-weight:600;
                ">
                    ${email}
                </div>
            </div>

            <div style="
                background:#f8fafc;
                border-radius:12px;
                padding:18px;
                margin-bottom:15px;
            ">
                <div style="
                    color:#6b7280;
                    font-size:13px;
                    margin-bottom:5px;
                ">
                    Phone Number
                </div>

                <div style="
                    color:#111827;
                    font-size:17px;
                    font-weight:600;
                ">
                    ${phone}
                </div>
            </div>

            <div style="
                background:#eef6ff;
                border-left:4px solid #2563eb;
                border-radius:12px;
                padding:20px;
                margin-top:25px;
            ">
                <div style="
                    color:#2563eb;
                    font-weight:700;
                    margin-bottom:10px;
                ">
                    Message
                </div>

                <div style="
                    color:#374151;
                    line-height:1.8;
                ">
                    ${comments}
                </div>
            </div>

        </div>

        <div style="
            background:#f9fafb;
            text-align:center;
            padding:18px;
            color:#6b7280;
            font-size:13px;
        ">
            Contact Form Notification
        </div>

    </div>

</div>
`
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }

});

module.exports = router;