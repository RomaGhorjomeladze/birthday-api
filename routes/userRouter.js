const router = require('express').Router()
const multer = require('multer')
const {storage} = require('../helper/storage')

const {isAuthenticated} = require('../middlewares/userMiddleware')

var upload = multer({storage: storage})
const {signUp, signIn, autoLogin} = require('../controllers/userController')

router.post('/signup', upload.single('file'),  signUp)
router.post('/signin/',   signIn)
router.post('/autologin', isAuthenticated, autoLogin)

module.exports = router