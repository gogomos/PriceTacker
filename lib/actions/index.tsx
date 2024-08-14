"use server"
import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import { Product } from "../models/product.model";
import { getLowestPrice , getHighestPrice, getAveragePrice } from "../utils";
export async function scrapeAndStoreProduct(url: string) {
    if (!url) {
        return;
    }
    try {
        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(url);
        if (!scrapedProduct) {
            return;
        }
        let product = scrapedProduct;
        const existingProduct = await Product.findOne({ url: scrapedProduct.url });
        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory, 
                { date: new Date(), price: existingProduct.currentPrice }]; 
                product = {
                     ...scrapedProduct,
                      priceHistory: updatedPriceHistory ,
                      lowestPrice: getLowestPrice(updatedPriceHistory),
                      highestPrice: getHighestPrice(updatedPriceHistory),
                      averagePrice: getAveragePrice(updatedPriceHistory),
                };
        } 
        const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url }, product, { upsert: true, new : true});
        revalidatePath(`/products/${newProduct._id}`)
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
    }
}

export async function getProduct(productId: string) {
    try {
        connectToDB();
        const product = await Product.findOne({ _id: productId});
        if (!product) return null;

        return product;
    } catch (error: any) {
        throw new Error(`Failed to get products: ${error.message}`);
    }
}

export async function getAllProducts () {
    try {
        connectToDB();
        const products = await Product.find();
        return products;
    } catch (error: any) {
        throw new Error(`Failed to get products: ${error.message}`);
    }
}