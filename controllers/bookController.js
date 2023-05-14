import Book from "../models/bookModel.js";
import fs from "fs";

//get all books
export const getAllBooks = async (req, res, next) => {
  try {
  const { page, limit } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Paginate items using mongoose-paginate-v2
    const options = {
      page: pageNumber || 1,
      limit: limitNumber || 10,
    };

    const items = await Book.paginate({}, options);

    return res.status(200).json({
      items: items.docs,
      totalPages: items.totalPages,
      currentPage: items.page,
      limit: items.limit,
      totalItems: items.totalDocs,
    });
  } catch (err) {
    next(err);
  }
}

//GET book by id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(`Error getting Book by ID: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}

//add book
export const addBook = async (req, res) => {
    console.log(req.body);
    try {
      const {
        title,
        author,
        description,
        donor,
        recipient,
        condition,
        status,
      } = req.body;

      let imagePath;
      if (req.file) {
        imagePath = req.file.path;
      }
  
      // Check required fields
      if (!title) {
        return res.status(400).json({ error: "Title is required." });
      }
  
      if (!author) {
        return res.status(400).json({ error: "Author is required." });
      }
  
      if (!description) {
        return res.status(400).json({ error: "Description is required." });
      }
  
      if (!donor) {
        return res.status(400).json({ error: "Donor is required." });
      }
  
      if (!condition) {
        return res.status(400).json({ error: "Condition is required." });
      }
  
      if (!status) {
        return res.status(400).json({ error: "Status is required." });
      }
  
      const newBook = new Book({
        title,
        author,
        description,
        donor,
        recipient,
        image: imagePath,
        condition,
        status,
      });
  
      const savedBook = await newBook.save();
      res.status(201).json({
        message: "Book added successfully.",
        data: { id: savedBook._id, info: savedBook },
      });
    } catch (error) {
      console.error(error.message);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    res.status(500).json({ message: "Failed to add book." });
    }
  };

//edit book by id
export const editBookById = async (req, res, next) => {
  let { id } = req.params;
  try {
    const oldBook = await Book.findById(req.params.id);
    console.log(req.body.image);
    !req.body.image ? null : fs.unlinkSync(oldBook.image);
    const response = await Book.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, response });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

// delete book
export const deleteBookById = async (req, res, next) => {
  let { id } = req.params;
  try {
    const oldBook = await Book.findById(req.params.id);
    if (!oldBook) {
      return res.status(409).send({ message: "Book does not exists" });
    }
    !oldBook.image ? null : fs.unlinkSync(oldBook.image);
    const response = await Book.findOneAndDelete({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      response,
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

const controller = {
  getAllBooks,
  addBook,
  getBookById,
  editBookById,
  deleteBookById,
};

export default controller;

// import Book from "../models/bookModel.js";
// import path from "path";

// // Add a new book
// export const addBook = async (req, res) => {
//   console.log(req.body);
//   try {
//     const {
//       title,
//       author,
//       description,
//       donor,
//       recipient,
//       image,
//       condition,
//       status,
//     } = req.body;

//     // Check required fields
//     // if (!title) {
//     //   return res.status(400).json({ error: "Title is required." });
//     // }

//     // if (!author) {
//     //   return res.status(400).json({ error: "Author is required." });
//     // }

//     // if (!description) {
//     //   return res.status(400).json({ error: "Description is required." });
//     // }

//     // if (!donor) {
//     //   return res.status(400).json({ error: "Donor is required." });
//     // }

//     // if (!condition) {
//     //   return res.status(400).json({ error: "Condition is required." });
//     // }

//     // if (!status) {
//     //   return res.status(400).json({ error: "Status is required." });
//     // }

//     const newBook = new Book({
//       title,
//       author,
//       description,
//       donor,
//       recipient,
//       image: req.file.path,
//       condition,
//       status,
//     });

//     const savedBook = await newBook.save();
//     res.status(201).json({
//       message: "Book added successfully.",
//       data: { id: savedBook._id, info: savedBook },
//     });
//   } catch (error) {
//     console.error(error.message);
//   if (error.name === "ValidationError") {
//     const errors = Object.values(error.errors).map((err) => err.message);
//     return res.status(400).json({ message: errors });
//   }
//   res.status(500).json({ message: "Failed to add book." });
//   }
// };

// // Edit book by ID
// export const editBookById = async (req, res) => {
//   try {
//     const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!book) {
//       return res.status(404).json({ error: "Book not found." });
//     }

//     res.status(200).json({
//       message: "Book updated successfully.",
//       data: { id: book._id, info: book },
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to update book." });
//   }
// };

// // Edit book by title
// export const editBookByTitle = async (req, res) => {
//   try {
//     const book = await Book.findOneAndUpdate(
//       { title: req.params.title },
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!book) {
//       return res.status(404).json({ error: "Book not found." });
//     }

//     res.status(200).json({
//       message: "Book updated successfully.",
//       data: { id: book._id, info: book },
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to update book." });
//   }
// };

// // Get all books
// export const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find({ isDeleted: false }).populate([
//       "donor",
//       "recipient",
//     ]);

//     res.status(200).json({
//       message: "Books retrieved successfully.",
//       data: { count: books.length, books },
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to retrieve books." });
//   }
// };

// // Get a book by ID
// export const getBookById = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id).populate(["donor", "recipient"]);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found." });
//     }
//     res.status(200).json({ data: book });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to get book by ID." });
//   }
// };

// // Get a book by title
// export const getBookByTitle = async (req, res) => {
//   try {
//     const book = await Book.findOne({ title: req.params.title }).populate(["donor", "recipient"]);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found." });
//     }
//     res.status(200).json({ data: book });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to get book by title." });
//   }
// };

// // Delete a book by ID
// export const deleteBookById = async (req, res) => {
//   try {
//     const deletedBook = await Book.findByIdAndDelete(req.params.id);
//     if (!deletedBook) {
//       return res.status(404).json({ message: "Book not found." });
//     }
//     res.status(200).json({ message: "Book deleted successfully." });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to delete book by ID." });
//   }
// };

// // Delete a book by title
// export const deleteBookByTitle = async (req, res) => {
//   try {
//     const deletedBook = await Book.findOneAndDelete({ title: req.params.title });
//     if (!deletedBook) {
//       return res.status(404).json({ message: "Book not found." });
//     }
//     res.status(200).json({ message: "Book deleted successfully." });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Failed to delete book by title." });
//   }
// };
