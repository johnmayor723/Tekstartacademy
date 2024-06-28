const express = require('express')
const app = express()
const ejs = require('ejs')

const port = process.env.port || 3000

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', (req, res)=>{
   res.render('index') 
})
app.listen(port, ()=>{
    console.log(`server started listeming on ${port}`)
})
