import express from "express";
import {
  addDonation,
  getDonations,
  getDonationById,
  editDonationById,
  deleteDonationById,
} from "../controllers/donationController.js";

const router = express.Router();

router.get("/", getDonations);
router.get("/:id", getDonationById);
router.post("/", addDonation);
router.put("/:id", editDonationById);
router.patch("/:id", editDonationById);
router.delete("/:id", deleteDonationById);

export default router;
