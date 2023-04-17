import { UserModel, RoleModel, CategoryModel, SubcategoryModel, ProductModel } from "../models";

export const validateEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (user) throw new Error("Correo electrónico ya registrado");
};

export const validateRole = async (role: string) => {
  const rol = await RoleModel.findOne({ role });
  if (!rol) throw new Error(`El rol ${role} no existe`);
};

export const existsUserById = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) throw new Error(`El usuario con ID ${id} no existe`);
  if (!user.status) throw new Error(`Usuario con ID ${id} desactivado`);
};

export const existsProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) throw new Error(`El producto con ID ${id} no existe`);
  if (!product.status) throw new Error(`Producto con ID ${id} desactivado`);
};

export const validateCategory = async (name: string) => {
  const category = await CategoryModel.findOne({ name: name.toUpperCase() });
  if (category) throw new Error(`Categoría ${name.toUpperCase()} ya registrada`);
};

export const existsCategoryById = async (id: string) => {
  const category = await CategoryModel.findById(id);
  if (!category) throw new Error(`La categoría con ID ${id} no existe`);
  if (!category.status) throw new Error(`Categoría con ID ${id} desactivada`);
};

export const validateSubcategory = async (name: string) => {
  const subcategory = await SubcategoryModel.findOne({ name: name.toUpperCase() });
  if (subcategory) throw new Error(`Subcategoría ${name.toUpperCase()} ya registrada`);
};

export const existsSubcategoryById = async (id: string) => {
  const subcategory = await SubcategoryModel.findById(id);
  if (!subcategory) throw new Error(`La subcategoría con ID ${id} no existe`);
  if (!subcategory.status) throw new Error(`Subcategoría con ID ${id} desactivada`);
};
