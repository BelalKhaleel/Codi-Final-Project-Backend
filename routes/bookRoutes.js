import express from "express";
const router = express.Router();
import controller from "../controllers/bookController.js";
import { uploadImage } from "../middleware/imageUpload.js";

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);

router.post("/", uploadImage, controller.addBook);
router.put("/:id", uploadImage, controller.editBookById);
router.delete("/:id", controller.deleteBookById);

export default router;

// import express from "express";
// import upload from "../middleware/imageUpload.js";
// import {
//   addBook,
//   editBookById,
//   editBookByTitle,
//   getAllBooks,
//   getBookById,
//   getBookByTitle,
//   deleteBookById,
//   deleteBookByTitle,
// } from "../controllers/bookController.js";

// const router = express.Router();

// // Add a new book
// router.post("/", addBook);

// // Get all books
// router.get("/", getAllBooks);

// // Get a book by ID
// router.get("/:id", getBookById);

// // Get a book by title
// router.get("/title/:title", getBookByTitle);

// // Update a book by ID
// router.put("/:id", editBookById);

// // Update a book by title
// router.put("/title/:title", editBookByTitle);

// // Edit a book by ID
// router.patch("/:id", editBookById);

// // Edit a book by title
// // router.patch("/title/:title", editBookByTitle);

// // Delete a book by ID
// router.delete("/:id", deleteBookById);

// // Delete a book by title
// // router.delete("/title/:title", deleteBookByTitle);

// //Add image to book
// router.post("/image", upload.single("image"), (req, res) => {
//   try {
//     res.status(200).json({ message: "Image uploaded successfully." });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to upload image." });
//   }
// });

// export default router;
