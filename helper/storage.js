const multer = require("multer");

exports.storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    let imageName = `${Date.now()}-${file.originalname}`;
    cb(null, imageName);
    req.imageName = imageName;
  }
});
