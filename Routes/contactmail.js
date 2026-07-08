const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
    try {

        const { name, email, phone, comments } = req.body;

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Chavara Media Contact Form",
                    email: "chavaramedia2020@gmail.com"   // Must be verified in Brevo
                },
                to: [
                    {
                        email: "chavaramedia2020@gmail.com",
                        name: "Chavara Media"
                    }
                ],
                replyTo: {
                    email: email,
                    name: name
                },
                subject: "New Contact Form Message",
                htmlContent: `
<div style="background:#f4f7fb;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">

<div style="max-width:650px;margin:auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,.08);">

<div style="background:#2563eb;padding:35px;text-align:center;color:#fff;">
<h2>📩 New Contact Enquiry</h2>
<p>A visitor has submitted a message through your website.</p>
</div>

<div style="padding:35px;">

<p><strong>Name:</strong> ${name}</p>

<p><strong>Email:</strong> ${email}</p>

<p><strong>Phone:</strong> ${phone}</p>

<p><strong>Message:</strong></p>

<div style="background:#eef6ff;padding:20px;border-left:4px solid #2563eb;">
${comments}
</div>

</div>

</div>

</div>
`
            },
            {
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json"
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message
        });

    }
});

module.exports = router;