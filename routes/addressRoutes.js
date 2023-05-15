import express from "express";
import { createAddress, getAllAddresses, getAddressById, deleteAddressById, editAddressById } from "../controllers/addressController.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new address
router.post("/", authenticateUser, createAddress);

// Route to get all addresses
router.get("/", authenticateAdmin, getAllAddresses);

// Route to get a specific address by ID
router.get("/:id", authenticateUser, getAddressById);

// Route to update a specific address by ID
router.patch("/:id", authenticateUser, editAddressById);

// Route to delete a specific address by ID
router.delete("/:id", authenticateUser, deleteAddressById);

export default router;
