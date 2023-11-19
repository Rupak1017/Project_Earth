const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', { name: 'Rupak' });
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
        user: 'rupakkapoor07@gmail.com',
        pass: 'cxcg xvyb yhnb xplm',
       
    },
});

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const info = await transporter.sendMail({
            to: 'rupakkapoor07@gmail.com',
            from: email,
            subject: 'Form Submission',
            html: `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone No.: ${phone}</p>
                <p>Message: ${message}</p>
            `,
        });

        console.log('Message sent: %s', info.messageId);
        res.render('confirm');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
