import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    surname: {
      type: String,
      required: [true, "El apellido es requerido"],
    },
    dni: {
      type: String,
      unique: true,
      sparse: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "El rol es necesario"],
      enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.method({
  // Método para cifrar contraseña
  encryptPassword: (password) => {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(password, salt);
  },
  // Método para comparar la contraseña cifrada
  checkPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
  toJSON: function() {
    const { _id, password, ...user } = this.toObject();
    user.id = _id;
    return user;
  }
});

export const User = model("User", UserSchema);
