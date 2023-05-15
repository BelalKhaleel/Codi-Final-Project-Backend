import Donation from "../models/donationModel.js";
import Book from "../models/bookModel.js";
import mongoose from "mongoose";

// Add new donation
export const addDonation = async (req, res) => {
  try {
    const { donor, recipient, book, status } = req.body;

    if (!donor) {
      return res.status(400).json({ message: "Donor is required" });
    }

    if (!recipient) {
      return res.status(400).json({ message: "Recipient is required" });
    }

    if (!book) {
      return res.status(400).json({ message: "Book is required" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Check if the book exists
    const bookExists = await Book.findById(book);
    if (!bookExists) {
      return res.status(400).json({ message: "Invalid book" });
    }

    const newDonation = new Donation({
      donor,
      recipient,
      book,
      status
    });

    const donation = await newDonation.save();

    // Populate fields
    // await donation
    //   .populate({
    //     path: "donor",
    //     select: "firstName lastName email",
    //   })
    //   .populate({
    //     path: "recipient",
    //     select: "firstName lastName email",
    //   })
    //   .populate("book")
    //   .execPopulate();

    res.status(201).json({
      message: "Donation added successfully.",
      data: donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get all donations
export const getDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page is 1
    const limit = 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find()
      // .populate(["donor", "recipient", "book"])
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Donations retrieved successfully.",
      data: donations,
      currentPage: page,
      totalPages: Math.ceil(await Donation.countDocuments() / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get donation by id
export const getDonationById = async (req, res) => {
  let { id } = req.params;
  // Check if id is present in the URL
  if (!id) {
   return res.status(400).send({ message: "Please enter donatin id" });
 }
 // Check if id is a valid MongoDB ObjectId
 if (!mongoose.isValidObjectId(id)) {
   return res.status(400).send({ message: "Please enter a valid donation id" });
 }
  try {
    const donation = await Donation.findById(req.params.id)
    // .populate([
    //   "donor",
    //   "recipient",
    //   "book",
    // ]);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }
    res.status(200).json({
      message: "Donation retrieved successfully.",
      data: donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Edit donation by id
export const editDonationById = async (req, res) => {
  let { id } = req.params;
  // Check if id is present in the URL
  if (!id) {
   return res.status(400).send({ message: "Please enter donatin id" });
 }
 // Check if id is a valid MongoDB ObjectId
 if (!mongoose.isValidObjectId(id)) {
   return res.status(400).send({ message: "Please enter a valid donation id" });
 }
  try {
    const { donor, recipient, book, status } = req.body;

    // Check if the book exists
    const bookExists = await Book.findById(book);
    if (!bookExists) {
      return res.status(400).json({ message: "Invalid book id." });
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        donor,
        recipient,
        book,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    // .populate(["donor", "recipient", "book"]);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    res.status(200).json({
      message: "Donation updated successfully.",
      data: donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Delete donation by id
export const deleteDonationById = async (req, res) => {
  let { id } = req.params;
  // Check if id is present in the URL
  if (!id) {
   return res.status(400).send({ message: "Please enter donatin id" });
 }
 // Check if id is a valid MongoDB ObjectId
 if (!mongoose.isValidObjectId(id)) {
   return res.status(400).send({ message: "Please enter a valid donation id" });
 }
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id)
    // .populate([
    //   "donor",
    //   "recipient",
    //   "book",
    // ]);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }
    res.status(200).json({
      message: "Donation deleted successfully.",
      data: { donation, deleted: true },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
