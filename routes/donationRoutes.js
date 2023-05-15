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

router.get("/",authenticateUser ,getDonations);
router.get("/:id", authenticateUser, getDonationById);
router.post("/", authenticateUser, addDonation);
router.put("/:id", authenticateAdmin, editDonationById);
router.patch("/:id", authenticateAdmin, editDonationById);
router.delete("/:id", authenticateAdmin, deleteDonationById);

export default router;
