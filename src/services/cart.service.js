import {
  addToCartRepo,
  getCartRepo,
  getCartByIdRepo,
  updateCartRepo,
  deleteCartRepo
} from "../repositories/contracts/cart.Repository.js";

/* CREATE */
export const addItem = async (data) => {
  if (!data?.product) {
    throw new Error("Product is required");
  }
  return await addToCartRepo(data);
};

/* READ - all */
export const fetchCart = async () => {
  return await getCartRepo();
};

/* READ - one */
export const fetchCartById = async (id) => {
  if (!id) {
    throw new Error("Cart ID is required");
  }
  return await getCartByIdRepo(id);
};

/* UPDATE */
export const updateCart = async (id, data) => {
  if (!id) {
    throw new Error("Cart ID is required");
  }
  if (data?.quantity !== undefined && data.quantity < 1) {
    throw new Error("Quantity must be >= 1");
  }
  return await updateCartRepo(id, data);
};

/* DELETE */
export const removeCart = async (id) => {
  if (!id) {
    throw new Error("Cart ID is required");
  }
  return await deleteCartRepo(id);
};
