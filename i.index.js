const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/send", async (req, res) => {
    const { email, password } = req.body;

    const logs = [];

    try {
        logs.push("Creating transporter...");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: password,
            },
        });

        logs.push("Transporter created");
        logs.push("Sending email...");

        const info = await transporter.sendMail({
            from: email,
            to: "sujoyk211@gmail.com",
            subject: "test",
            text: "success ✅",
        });

        logs.push("Email sent!");
        logs.push("Message ID: " + info.messageId);

        res.json({
            success: true,
            logs,
        });

    } catch (error) {
        logs.push("Error occurred!");
        logs.push(error.message);

        res.json({
            success: false,
            logs,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
