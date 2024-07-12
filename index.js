const express = require('express')
require('dotenv').config()
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const ejs = require('ejs')
const flash = require('connect-flash')
const nodemailer = require('nodemailer')


//import routers
const queryRouter = require('./routes/router.query');
const enrollRouter = require('./routes/router.enroll')
const mainRouter = require('./routes/router.main');
const coursesRouter = require('./routes/router.courses');

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



 // Use the contact router
app.use('/', mainRouter);
app.use('/', coursesRouter);
app.use(queryRouter);
app.use(enrollRouter)


app.listen(port, ()=>{
    console.log(`server started listening on ${port}`)
})
