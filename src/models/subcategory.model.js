import { Schema, model } from "mongoose";

const SubcategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre de la subcategoría es obligatorio"],
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
},
{
  versionKey: false,
});

SubcategorySchema.method({
  toJSON: function() {
    const { _id, status, ...subcategory } = this.toObject();
    subcategory.id = _id;
    return subcategory;
  }
});

export const Subcategory = model("Subcategory", SubcategorySchema);