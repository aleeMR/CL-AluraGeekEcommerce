import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción del producto es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "El precio del producto es obligatorio"],
  },
  stock: {
    type: Number,
    required: [true, "El stock del producto es obligatorio"],
  },
  image: {
    type: String,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory_id: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
  },
},
{
  timestamps: true,
  versionKey: false,
});

ProductSchema.method({
  toJSON: function() {
    const { _id, status, ...product } = this.toObject();
    product.id = _id;
    return product;
  }
});

export const Product = model("Product", ProductSchema);