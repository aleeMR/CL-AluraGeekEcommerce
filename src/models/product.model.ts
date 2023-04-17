import { DocumentType, Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Category, Subcategory } from ".";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class Product {
  @prop({ required: [true, "El nombre del producto es obligatorio"] })
  name!: string;

  @prop({ required: [true, "La descripción del producto es obligatoria"] })
  description!: string;
  
  @prop({ required: [true, "El precio del producto es obligatorio"] })
  price!: number;

  @prop({ required: [true, "El stock del producto es obligatorio"] })
  stock!: number;

  @prop()
  image?: string;

  @prop({ required: true, default: true })
  available!: boolean;

  @prop({ required: true, default: true })
  status!: boolean;

  @prop({ ref: () => Category, required: true })
  category_id!: Ref<Category>;

  @prop({ ref: () => Subcategory })
  subcategory_id?: Ref<Subcategory>;

  toJSON(this: DocumentType<Product>) {
    const { status, ...product } = this.toObject();
    return product;
  }
}

export const ProductModel = getModelForClass(Product);