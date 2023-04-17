import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class Subcategory {
  @prop({ required: [true, "El nombre de la subcategoría es obligatorio"] })
  name!: string;

  @prop({ required: true, default: true })
  status!: boolean;

  toJSON(this: DocumentType<Subcategory>) {
    const { status, ...subcategory } = this.toObject();
    return subcategory;
  }
}

export const SubcategoryModel = getModelForClass(Subcategory);