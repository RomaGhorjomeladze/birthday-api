const router = require('express').Router()
const multer = require('multer')
const {storage} = require('../helper/storage')

var upload = multer({storage: storage})
const {signUp} = require('../controllers/userController')

router.post('/signup/', upload.single('file'),  signUp)
// router.post('/signup/',   signUp)


module.exports = router