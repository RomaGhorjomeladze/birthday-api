const router = require("express").Router();
const multer = require("multer");

const storage = multer.memoryStorage();

const { isAuthenticated } = require("../middlewares/userMiddleware");

var upload = multer({ storage: storage });
const {
  signUp,
  signIn,
  autoLogin,
  getImage
} = require("../controllers/userController");

router.post("/signup", upload.single("file"), signUp);
router.post("/signin/", signIn);
router.post("/autologin", isAuthenticated, autoLogin);

router.get("/uploads/:id", getImage);

module.exports = router;
