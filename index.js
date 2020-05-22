const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || "---"
let smtp_password = process.env.SMTP_PASSWORD || "---"

let transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: smtp_login , // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.post('/sendMessage', async function (req, res) {

    let {message,contacts,name} = req.body

    let info = await transporter.sendMail({
        from: "From user",
        to: "shpakovad@gmail.com",
        subject: "Test gmail",
        html: `<b>Сообщение с портфолио</b>,
<div>name: ${name}</div>
<div>contacts: ${contacts}</div>
<div>message: ${message}</div>
`
    });


    res.send('Ok');
});

let port = process.env.PORT || 3010
app.listen(port, function () {
    console.log('Example app listening on port 3010!');
});
