const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "../client/public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, "dog" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // TODO: validate file.mimetype
  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload.single("image");
