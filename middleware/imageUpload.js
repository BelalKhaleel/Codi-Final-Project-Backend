import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      `${file.originalname.split(".")[0]}.${file.mimetype.split("/")[1]}`
    );
  },
});

const upload = multer({
  storage: storage,
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
    req.body.image = req.file.path;
    console.log(req.body.image);
    next();
  });
}

const image = {
  uploadImage,
};

export default image;

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("File type not supported"), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

// export default upload;
