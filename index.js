const express = require('express')
require('dotenv').config()
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const ejs = require('ejs')
const flash = require('connect-flash')
const nodemailer = require('nodemailer')

const Enrolled = require('./models/enrolled')

const port = process.env.port || 3000
let DBURL = process.env.DB_URL
//app configurations
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded())
//setting session parameters
app.use(session({
   secret: 'mysupersecret',
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({ mongoUrl: DBURL })
 }));
app.use(flash());
// Middleware to make session  and flash messages available to all templates

app.use((req, res, next) => {
   res.locals.session = req.session
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'mayowa.teckstart@gmail.com',
     pass: process.env.GMAIL_PASSWORD,
   },
 });

// main routes
app.get('/', (req, res)=>{
   res.render('index') 
})

app.get('/about', (req, res)=>{
    res.render('about') 
 })

 app.get('/contact', (req, res)=>{
    res.render('contact') 
 })
 
 app.get('/course', (req, res)=>{
    res.render('course') 
 })

 app.get('/enroll', (req, res)=>{
   res.render('enroll') 
})

 //courses categories routes

app.get('/apps', (req, res)=>{
   res.render('apps') 
})
app.get('/uiux', (req, res)=>{
   res.render('uiux') 
})
app.get('/web', (req, res)=>{
   res.render('web') 
})
app.get('/devops', (req, res)=>{
   res.render('devops') 
})

app.get('/data', (req, res)=>{
   res.render('data') 
})

// Individual Courses Route

app.get('/datascience', function(req, res){
   res.render('datascience')
})

app.get('/frontendbeginner', function(req, res){
   res.render('frontendbeginer')
})

app.get('/frontendbeginner', function(req, res){
   res.render('frontendbeginer')
})

// coure enrollement 
 app.post('/enroll', (req, res)=>{
   
   const name = req.body.name;
   const email = req.body.email;
   const course = req.body.course;
   let enrolledUser = {name, email, course}
   console.log(enrolledUser)
  // Logging the form data
  
  Enrolled.create(enrolledUser)
  .then(data=>{
   //req.flash("success", "Welcome to YelpCamp " + user.username);
   req.flash('success', 'Successfully enrolled!');
   res.redirect("/enroll")


   // HTML email content
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; border: 1px dotted #8b0d32; padding: 20px; max-width: 600px; margin: auto;  display: flex; flex-direction: column; justify-content: space-between;">
    
    <div style="padding: 20px; border: 1px dotted #8b0d32; border-radius: 5px;">
    <img src="https://via.placeholder.com/150" alt="Tecksatart Academy Logo" style="display: block; margin: auto;">
      <h1 style="color: #8b0d32; text-align: center;">Enrollment Confirmation</h1>
      <p style="marging-top:50px;">Hello ${name},</p>
      <p>Thank you for enrolling in our ${course} course.</p>
      <p>Best regards,<br>Tecksatart Academy Team</p>
      <p>Tecksatart Academy</p>
      <p style="marging-top:200px;text-align: left; font-size: 12px; color: gray;">1234 Academy St, Suite 567</p>
      <p style="text-align: left; font-size: 12px; color: gray;>City, State, ZIP Code</p>
      <p style="text-align: left; font-size: 12px; color: gray;>Email: info@tecksatartacademy.com</p>
    </div>
    
  </div>
`;


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

app.listen(port, ()=>{
    console.log(`server started listening on ${port}`)
})
