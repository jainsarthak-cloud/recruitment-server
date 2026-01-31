import Cart from "../../models/Cart.Model.js";

/* CREATE */
export const addToCartRepo = (data) => Cart.create(data);

/* READ - all */
export const getCartRepo = () => Cart.find();

/* READ - by id */
export const getCartByIdRepo = (id) => Cart.findById(id);

/* UPDATE */
export const updateCartRepo = (id, data) =>
  Cart.findByIdAndUpdate(id, data, { new: true });

/* DELETE */
export const deleteCartRepo = (id) =>
  Cart.findByIdAndDelete(id);
