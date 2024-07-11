const express = require('express')
require('dotenv').config()
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const ejs = require('ejs')
const flash = require('connect-flash')

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
