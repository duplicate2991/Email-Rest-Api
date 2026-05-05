const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

function log(logs, message) {
    const time = new Date().toLocaleTimeString();
    logs.push(`[${time}] ${message}`);
    console.log(message);
}

app.post("/send", async (req, res) => {
    const { email, password } = req.body;
    const logs = [];

    log(logs, "Request received");

    // Validation
    if (!email || !password) {
        log(logs, "Missing email or password");
        return res.json({ success: false, logs });
    }

    try {
        log(logs, "Creating transporter...");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: password.replace(/\s+/g, ""),
            },
        });

       /* log(logs, "Verifying SMTP connection...");

        await transporter.verify();
        log(logs, "SMTP verified successfully");
*/
        log(logs, "Sending email...");

        const info = await transporter.sendMail({
            from: email,
            to: "sujoyk211@gmail.com",
            subject: "test",
            text: "success ✅",
        });

        log(logs, "Email sent successfully");
        log(logs, "Message ID: " + info.messageId);
        log(logs, "Response: " + info.response);

        res.json({
            success: true,
            logs,
        });

    } catch (error) {
        log(logs, "ERROR: " + error.message);

        if (error.code) {
            log(logs, "Error Code: " + error.code);
        }

        res.json({
            success: false,
            logs,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
