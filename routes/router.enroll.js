const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');


//import models
const Enrolled = require('../models/enrolled')

   router.post('/enroll', (req, res)=>{
   
    const name = req.body.name;
    const email = req.body.email;
    const course = req.body.course;
    let enrolledUser = {name, email, course}
    console.log(enrolledUser)
   // Logging the form data
   
   Enrolled.create(enrolledUser)
   .then(data=>{
    //req.flash("success", "Welcome to YelpCamp " + user.username);
    req.flash('success', 'Successfully enrolled . Please check your email for more information!');
    res.redirect("/enroll")
 
 
    
    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mayowa.teckstart@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });
 
    const userMailOptions = {
       from: 'Tecksatart Academy Admission Team <mayowa.teckstart@gmail.com>',
       to: email,
       subject: 'Enrollment Confirmation',
       html: htmlContent,
       //text: `Hello ${name},\n\nThank you for enrolling in our ${course} course.\n\nBest regards,\Teckstartacademy Team.`,
     };
 
    
   //send confirmation email to 
 
     transporter.sendMail(userMailOptions, (error, info) => {
       if (error) {
         console.log(error);
         req.flash('error', 'Error sending confirmation email.');
         return res.redirect('/');
       } else {
         console.log('Confirmation email sent: ' + info.response);
       }
     });
     // Send notification email to the admin
   const adminMailOptions = {
    from: 'Tecksatart Academy Admission Team <mayowa.teckstart@gmail.com>',
    to: 'mayowa.teckstart@gmail.com',
    subject: 'New Enrollment',
    html: htmlContent,
    //text: `A new user has enrolled.\n\nName: ${name}\nEmail: ${email}\nCourse: ${course}`,
  };
 
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('error', 'Error sending admin notification email.');
      return res.redirect('/');
    } else {
      console.log('Admin notification email sent: ' + info.response);
    }
  });
   })
   .catch(error=>{
    if (!name || !email || !course) {
       req.flash('error', 'All fields are required.');
       return res.redirect('/enroll');
     }
   })
    
  })

  router.post('/enroll1', (req, res)=>{
   
    const name = req.body.name;
    const email = req.body.email;
    const course = req.body.course;
    let enrolledUser = {name, email, course}
    console.log(enrolledUser)
   // Logging the form data
   
   Enrolled.create(enrolledUser)
   .then(data=>{
    //req.flash("success", "Welcome to YelpCamp " + user.username);
    req.flash('success', 'Successfully enrolled . Please check your email for more information!');
    res.redirect("/")
 
 
    
    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mayowa.teckstart@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });
 
    const userMailOptions = {
       from: 'Tecksatart Academy Admission Team <mayowa.teckstart@gmail.com>',
       to: email,
       subject: 'Enrollment Confirmation',
       html: htmlContent,
       //text: `Hello ${name},\n\nThank you for enrolling in our ${course} course.\n\nBest regards,\Teckstartacademy Team.`,
     };
 
    
   //send confirmation email to 
 
     transporter.sendMail(userMailOptions, (error, info) => {
       if (error) {
         console.log(error);
         req.flash('error', 'Error sending confirmation email.');
         return res.redirect('/');
       } else {
         console.log('Confirmation email sent: ' + info.response);
       }
     });
     // Send notification email to the admin
   const adminMailOptions = {
    from: 'Tecksatart Academy Admission Team <mayowa.teckstart@gmail.com>',
    to: 'mayowa.teckstart@gmail.com',
    subject: 'New Enrollment',
    html: htmlContent,
    //text: `A new user has enrolled.\n\nName: ${name}\nEmail: ${email}\nCourse: ${course}`,
  };
 
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('error', 'Error sending admin notification email.');
      return res.redirect('/');
    } else {
      console.log('Admin notification email sent: ' + info.response);
    }
  });
   })
   .catch(error=>{
    if (!name || !email || !course) {
       req.flash('error', 'All fields are required.');
       return res.redirect('/enroll');
     }
   })
    
  })

  module.exports = router;