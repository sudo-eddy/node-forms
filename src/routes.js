
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

//Get main page
router.get('/', (req, res) => {
  res.render('index')
})

//Get contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken()
  })
})

//Validate and sanitize message and email
router.post('/contact', upload.single('photo'), [
  //validation
  check('message')
    .isLength({ min: 3 })
    .withMessage('Message is required')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('That email doesn\`t look right')
    .trim()
    .normalizeEmail()
], (req, res) => {
  //error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('contact', {
      data: req.body,
      errors: errors.mapped(),
      csrfToken: req.csrfToken()
    })
  }
  
  if (req.file) {
    console.log('Uploaded: ', req.file)
    //Homework: upload file to S3
  }
  
  const data = matchedData(req)
  console.log('Sanitized:', data)
  //homework: send sanitized data in email or persist in a db

  req.flash('success', 'Thanks for the message! I\'ll be in touch :)')
  res.redirect('/')
})

module.exports = router
