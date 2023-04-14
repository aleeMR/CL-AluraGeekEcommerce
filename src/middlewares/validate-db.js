import { User, Role, Category, Subcategory, Product } from "../models/index.js";

export const validateEmail = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) throw new Error("Correo electrónico ya registrado");
};

export const validateRole = async (role = "") => {
  const rol = await Role.findOne({ role });
  if (!rol) throw new Error(`El rol ${role} no existe`);
};

export const existsUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error(`El usuario con ID ${id} no existe`);
  if (!user.status) throw new Error(`Usuario con ID ${id} desactivado`);
};

export const existsProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`El producto con ID ${id} no existe`);
  if (!product.status) throw new Error(`Producto con ID ${id} desactivado`);
};

export const validateCategory = async (name = "") => {
  const category = await Category.findOne({ name: name.toUpperCase() });
  if (category) throw new Error(`Categoría ${name.toUpperCase()} ya registrada`);
};

export const existsCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error(`La categoría con ID ${id} no existe`);
  if (!category.status) throw new Error(`Categoría con ID ${id} desactivada`);
};

export const validateSubcategory = async (name = "") => {
  const subcategory = await Subcategory.findOne({ name: name.toUpperCase() });
  if (subcategory) throw new Error(`Subcategoría ${name.toUpperCase()} ya registrada`);
};

export const existsSubcategoryById = async (id) => {
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) throw new Error(`La subcategoría con ID ${id} no existe`);
  if (!subcategory.status) throw new Error(`Subcategoría con ID ${id} desactivada`);
};
