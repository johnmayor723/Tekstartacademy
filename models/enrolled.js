const mongoose = require('mongoose');
require('dotenv').config();



const URL = process.env.DB_URL
// Connecting Mongoose
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Setting up the schema
const Enrolled = new mongoose.Schema({
  fullname: String,
  email:String,
  course: String
});



module.exports = mongoose.model('Enrolled', Enrolled);