
const express = require('express')
const router = express.Router()

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

router.post('/contact', (req, res) => {
  res.render('contact', {
    data: req.body, // { message, email }
    errors: {
      message: {
        msg: 'A message is required'
      },
      email: {
        msg: 'That email doesn\'t look right'
      }
    }
  })
})

module.exports = router
