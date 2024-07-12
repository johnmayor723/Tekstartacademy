const express = require('express');
const router = express.Router();

// Main routes
router.get('/', (req, res) => {
   res.render('index');
});

router.get('/about', (req, res) => {
   res.render('about');
});

router.get('/contact', (req, res) => {
   res.render('contact');
});

router.get('/course', (req, res) => {
   res.render('course');
});

// Course enrollment route
router.get('/enroll', (req, res) => {
    res.render('enroll');
 });

module.exports = router;
