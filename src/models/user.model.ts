import bcrypt from "bcryptjs";
import { DocumentType, getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
@pre<User>('save', async function() {
  // Si la contraseña no tuvo cambios
  if (!this.isModified('password')) return;

  // Si la contraseña es nueva o fue modificada
  const salt: string = bcrypt.genSaltSync(5);
  this.password = bcrypt.hashSync(this.password, salt);
})
export class User {
  @prop({ required: [true, "El correo es obligatorio"], unique: true })
  email!: string;

  @prop({ required: [true, "La contraseña es obligatoria"] })
  password!: string;

  @prop({ required: [true, "El nombre es requerido"] })
  name!: string;

  @prop({ required: [true, "El apellido es requerido"] })
  surname!: string;

  @prop({ unique: true, sparse: true })
  dni?: string;

  @prop()
  image?: string;

  @prop({ required: [true, "El rol es necesario"], enum: ["ADMIN_ROLE", "USER_ROLE"] })
  role!: string;
      
  @prop({ default: true })
  status?: boolean;

  @prop({ default: true })
  google?: boolean;

  checkPassword(this: DocumentType<User>, password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  toJSON(this: DocumentType<User>) {
    const { password, ...user } = this.toObject();
    return user;
  }
}

export const UserModel = getModelForClass(User);
