import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
});
