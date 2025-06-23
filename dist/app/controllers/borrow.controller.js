"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = require("express");
const book_models_1 = require("../models/book.models");
const borrow_models_1 = require("../models/borrow.models");
exports.borrowRouter = (0, express_1.Router)();
// borrowRouter.post("/", async (req: Request, res: Response)=> {
//   const { book, quantity, dueDate } = req.body;
//   try {
//     const bookData = await Book.findById(book);
//     // book ta pawa na gele
//     if (!bookData) {
//        res.status(404).json({
//         success: false,
//         message: "Book not found",
//       });
//     }
//     // book er enough copy na thakle
//     if (bookData.copies < quantity) {
//        res.status(400).json({
//         success: false,
//         message: "Not enough copies available",
//       });
//     }
//     bookData.copies -= quantity;
//     bookData.updateAvailability();
//     await bookData.save();
//     const borrowRecord = await Borrow.create({
//       book,
//       quantity,
//       dueDate,
//     });
//      res.status(201).json({
//       success: true,
//       message: "Book borrowed successfully",
//       data: borrowRecord,
//     });
//   } catch (error: any) {
//     res.status(402).json({
//       success: false,
//       message: error.message,
//       errors: error,
//     });
//   }
// });
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    try {
        const bookData = yield book_models_1.Book.findById(book);
        if (!bookData) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        else if (bookData.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
        }
        else {
            bookData.copies -= quantity;
            bookData.updateAvailability();
            yield bookData.save();
            const borrowRecord = yield borrow_models_1.Borrow.create({
                book,
                quantity,
                dueDate,
            });
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrowRecord,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            errors: error,
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_models_1.Borrow.aggregate([
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
            message: "Borrowed books summary retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            errors: error,
        });
    }
}));
