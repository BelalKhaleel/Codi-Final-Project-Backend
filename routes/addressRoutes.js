import express from "express";
import { createAddress, getAllAddresses, getAddressById, deleteAddressById, editAddressById } from "../controllers/addressController.js";

const router = express.Router();

// Route to create a new address
router.post("/", createAddress);

// Route to get all addresses
router.get("/", getAllAddresses);

// Route to get a specific address by ID
router.get("/:id", getAddressById);

// Route to update a specific address by ID
router.patch("/:id", editAddressById);

// Route to delete a specific address by ID
router.delete("/:id", deleteAddressById);

export default router;
