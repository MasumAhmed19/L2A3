import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.models";

const borrowSchema = new Schema<IBorrow>({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },quantity:{
        type: Number,
        required: true,
        min:[1, "Must be a positive integer"]
    },dueDate:{
        type: Date,
        required:true,
    }
},{
    versionKey:false,
    timestamps:true
})

borrowSchema.pre('save', async function (next){
    const bookData = await Book.findById(this.book).exec();

    if (!bookData) {
        throw new Error("Referenced book not found");
    }

    if (this.dueDate < (bookData as any).updatedAt) {
        throw new Error("Due date must be after the book's last update");
    }
    next();
})

export const Borrow = model('Borrow', borrowSchema);