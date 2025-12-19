import mongoose from "mongoose";

const { Schema } = mongoose

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

export const Product = mongoose.model("Product", ProductSchema);