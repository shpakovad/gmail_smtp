const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: "shpakovad@gmail.com", // generated ethereal user
        pass: "80291332819", // generated ethereal password
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

app.listen(3010, function () {
    console.log('Example app listening on port 3010!');
});
