import { DocumentType, Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Subcategory } from ".";

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class Category {
  @prop({ required: [true, "El nombre de la categoría es obligatorio"], unique: true })
  name!: string;

  @prop({ required: true, default: true })
  status!: boolean;

  @prop({ ref: () => Subcategory })
  subcategory_ids?: Ref<Subcategory>[];

  toJSON(this: DocumentType<Category>) {
    const { status, ...category } = this.toObject();
    return category;
  }
}

export const CategoryModel =getModelForClass(Category);