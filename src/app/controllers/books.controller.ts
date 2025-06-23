import express, { Router, Request, Response } from "express";
import { Book } from "../models/book.models";

export const booksRouter = Router();

booksRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
});

booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string | undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as string | undefined;
    const limit = parseInt(req.query.limit as string) || 10;

    const query = filter ? { genre: filter.toUpperCase() } : {};
    let booksQuery = Book.find(query);

    if (sortBy && sortOrder) {
      const sortValue = sortOrder.toLowerCase() === "asc" ? 1 : -1;
      booksQuery = booksQuery.sort({ [sortBy]: sortValue });
    }

    const books = await booksQuery.limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

booksRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const books = await Book.findById(id);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

booksRouter.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const updateData = req.body;
    const books = await Book.findByIdAndUpdate(id, updateData, {new: true});

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const books = await Book.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});