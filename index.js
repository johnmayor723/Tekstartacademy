const express = require('express')
const app = express()
const ejs = require('ejs')

const port = process.env.port || 3000

//app configurations
app.set('view engine', 'ejs');
app.use(express.static("public"));

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
 
 app.get('/courses', (req, res)=>{
    res.render('course') 
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


app.listen(port, ()=>{
    console.log(`server started listening on ${port}`)
})
