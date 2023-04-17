import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class Role {
  @prop({ required: [true, "El rol es obligatorio"] })
  role!: string;
}

export const RoleModel = getModelForClass(Role);
