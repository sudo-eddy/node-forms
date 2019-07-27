
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

//Get main page
router.get('/', (req, res) => {
  res.render('index')
})

//Get contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    data: {},
    errors: {}
  })
})

//Validate and sanitize message and email
router.post('/contact', [
  check('message')
    .isLength({ min: 1 })
    .withMessage('Message is required')
    .trim(),
  check('email')
    isEmail()
    withMessage('That email doesn\`t look right')
    .trim()
    normalizeEmail()
], (req, res) => {
  const errors = validationResult(req)
  res.render('contact', {
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
})

module.exports = router
