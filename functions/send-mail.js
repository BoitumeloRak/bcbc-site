require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  console.log('Incoming request:', event.httpMethod);
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let name, email, message;
  try {
    ({ name, email, message } = JSON.parse(event.body));
    console.log('Parsed body:', name, email, message);
  } catch (err) {
    console.error('Invalid JSON:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' })
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Mail sent:', info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
