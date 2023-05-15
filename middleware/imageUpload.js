import multer from "multer";
// import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(
      null,
      `${file.originalname.split(".")[0]}.${file.mimetype.split("/")[1]}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export function uploadImage(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    // req.body.image = req.file.path;
    // next();

    // Check if 'req.file' is undefined, indicating no file was uploaded
    console.log(req.file);
    if (!req.file) {
      console.log("No image provided. Skipping image upload.");
      return next();
    }

    // Set the uploaded image file path to 'req.body.image'
    req.imagePath = req.file.path;
    console.log(req.imagePath);
    next();
  });
}

// const image = {
//   uploadImage,
// };

// export default image;

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads/");
//   },
//   filename: function (req, file, callback) {
//     callback(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });


// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

// export default upload;
