import express from "express";
const router = express.Router();
import controller from "../controllers/bookController.js";
import { uploadImage } from "../middleware/imageUpload.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);

router.post("/", authenticateUser, uploadImage, controller.addBook);
router.put("/:id", authenticateUser, uploadImage, controller.editBookById);
router.patch("/:id", authenticateUser, uploadImage, controller.editBookById);
router.delete("/:id", authenticateUser, controller.deleteBookById);

export default router;
