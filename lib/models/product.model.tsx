import { url } from "inspector";
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    url : { type: String, required: true, unique: true },
    title : { type: String, required: true },
    description : { type: String },
    currentPrice : { type: Number, required: true },
    originalPrice : { type: Number },
    currency : { type: String, required: true },
    image : { type: String },
    discountRate : { type: Number },
    category : { type: String },
    isOutOfStock : { type: Boolean },
    reviewsCount : { type: Number },
    stars : { type: Number },
    lowestPrice : { type: Number },
    highestPrice : { type: Number },
    averagePrice : { type: Number },
    priceHistory : [
        {
            date : { type: Date, default: Date.now },
            price : { type: Number, required: true },
        },
    ],
    users: [
        {email: { type: String, required: true }},
    ], default: [],
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);