
const express = require('express')
const router = express.Router()

//Get main page
router.get('/', (req, res) => {
  res.render('index')
})

//Get contact page
router.get('/contact', (req, res) => {
  res.render('contact')
})

module.exports = router
