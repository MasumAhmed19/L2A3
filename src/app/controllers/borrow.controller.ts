import express, { Request, Response } from "express";
import { Book } from "../models/book.models";
import { Borrow } from "../models/borrow.models";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const bookData = await Book.findById(book);

    // book ta pawa na gele
    if (!bookData) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    // book er enough copy na thakle
    if (bookData.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    bookData.copies -= quantity;
    bookData.updateAvailability();

    await bookData.save();

    const borrowRecord = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    res.status(402).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", //kon collection theke data ante chai
          localField: "_id", // Borrow er kon field e refer kora ache
        // localField: "book", // Borrow er kon field e refer kora ache
          foreignField: "_id", // Book er kon field e refer kora ache
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data:result
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
});
