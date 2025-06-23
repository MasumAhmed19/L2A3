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
exports.booksRouter = void 0;
const express_1 = require("express");
const book_models_1 = require("../models/book.models");
exports.booksRouter = (0, express_1.Router)();
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const book = yield book_models_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
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
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        const limit = parseInt(req.query.limit) || 10;
        const query = filter ? { genre: filter.toUpperCase() } : {};
        let booksQuery = book_models_1.Book.find(query);
        if (sortBy && sortOrder) {
            const sortValue = sortOrder.toLowerCase() === "asc" ? 1 : -1;
            booksQuery = booksQuery.sort({ [sortBy]: sortValue });
        }
        const books = yield booksQuery.limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const books = yield book_models_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));
exports.booksRouter.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updateData = req.body;
        const books = yield book_models_1.Book.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const books = yield book_models_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));
