const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');



// Handle query form submission


router.post('/contact', (req, res) => {
  const { name, email, message, course } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    req.flash('error', 'All fields are required.');
    return res.redirect('/contact');
  }

  // Log the form data (you can add more complex logic here)
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Render the email template with user data for the user confirmation email
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; border: 1px dotted #8b0d32; padding: 20px; max-width: 600px; margin: auto;  display: flex; flex-direction: column; justify-content: space-between;">
      <div style="padding: 20px; border: 1px dotted #8b0d32; border-radius: 5px;">
        <img height="40px" src="https://firebasestorage.googleapis.com/v0/b/bolbuk.appspot.com/o/my_logo.png?alt=media&token=d873cc61-fdab-425b-a5a7-4dc333a55aec" alt="Tecksatart Academy Logo" style="display: block; margin: auto;">
        <h1 style="color: #8b0d32; text-align: center;">Re: Enquiry</h1>
        <p style="margin-top:50px;">Hello ${name},</p>
        <p>Thank you for your interest in our ${course} course.</p>
        <p>Your request has been received, we will reach back to you with all details <br> as soon aspossible.</p>
        <p>Best regards,<br>Tecksatart Academy Team</p>
        <p>Tecksatart Academy</p>
        <p style="margin-top:200px;text-align: left; font-size: 12px; color: gray;">F1, The City Mall, Onikan</p>
        <p style="text-align: left; font-size: 12px; color: gray;">Lagos island, Lagos.</p>
        <p style="text-align: left; font-size: 12px; color: gray;">Phone: +2349123907060</p>
        <p style="text-align: left; font-size: 12px; color: gray;">Email: info@tecksatartacademy.com.ng</p>
        <p style="text-align: left; font-size: 12px; color: gray;">web: www.tecksatartacademy.com.ng</p>
      </div>
    </div>
  `;
 
 // Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mayowa.teckstart@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});
  // Send confirmation email to the user
  const userMailOptions = {
    from: 'Tecksatart Academy Team <mayowa.teckstart@gmail.com>',
    to: email,
    subject: 'Query Received',
    html: htmlContent,
  };

  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('error', 'Error sending confirmation email to user.');
      return res.redirect('/query');
    } else {
      console.log('User confirmation email sent: ' + info.response);
    }
  });

  // Send notification email to the admin
  const adminMailOptions = {
    from: 'Tecksatart Academy Team <mayowa.teckstart@gmail.com>',
    to: 'mayowaandrews723@gmail.com',
    subject: 'New Query Submitted',
    html: `
      <div>
        <p>New query has been submitted:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('error', 'Error sending admin notification email.');
      return res.redirect('/contact');
    } else {
      console.log('Admin notification email sent: ' + info.response);
    }
  });

  req.flash('success', 'Your message has been sent and a confirmation email has been sent to you!');
  res.redirect('/contact');
});

module.exports = router;
