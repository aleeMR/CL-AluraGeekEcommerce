import { Schema, model } from "mongoose";

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio"],
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  subcategory_ids: {
    type: [Schema.Types.ObjectId],
    ref: "Subcategory",
  },
},
{
  versionKey: false,
});

CategorySchema.method({
  toJSON: function() {
    const { _id, status, ...category } = this.toObject();
    category.id = _id;
    return category;
  }
});

export const Category = model("Category", CategorySchema);