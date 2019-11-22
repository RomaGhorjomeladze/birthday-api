const router = require('express').Router()
const {createEvent} = require('../controllers/eventController')

router.post('/createevent', createEvent)


module.exports = router