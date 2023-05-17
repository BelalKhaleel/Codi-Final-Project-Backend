import express from "express";
import {
  addDonation,
  getDonations,
  getDonationById,
  editDonationById,
  deleteDonationById,
} from "../controllers/donationController.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",authenticateAdmin ,getDonations);
router.get("/:id", authenticateUser, getDonationById);
router.post("/", authenticateUser, addDonation);
router.put("/:id", authenticateUser, editDonationById);
router.patch("/:id", authenticateUser, editDonationById);
router.delete("/:id", authenticateAdmin, deleteDonationById);

export default router;
