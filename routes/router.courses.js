const express = require('express');
const router = express.Router();

// Course categories routes
router.get('/apps', (req, res) => {
   res.render('apps');
});

router.get('/uiux', (req, res) => {
   res.render('uiux');
});

router.get('/web', (req, res) => {
   res.render('web');
});

router.get('/devops', (req, res) => {
   res.render('devops');
});

router.get('/data', (req, res) => {
   res.render('data');
});

// Individual courses routes
router.get('/datascience', (req, res) => {
   res.render('datascience');
});

router.get('/frontendbeginner', (req, res) => {
   res.render('frontendbeginner');
});

router.get('/cybersecurity', (req, res) => {
   res.render('cybersecurity');
});



module.exports = router;
