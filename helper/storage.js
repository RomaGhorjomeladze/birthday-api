const multer = require("multer");

exports.storage = multer.diskStorage({

  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
      console.log('req',req.body)
    let imageName = `${file.filename}-${Date.now()}.${
      file.mimetype.split("/")[1]
    }`;
    cb(null, imageName);
    req.imageName = imageName
  }
});
