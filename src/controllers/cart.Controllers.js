import {
  addItem,
  fetchCart,
  fetchCartById,
  updateCart,
  removeCart
} from "../services/cart.service.js";

export const addToCart = async (req, res, next) => {
  try {
    const cart = await addItem(req.body);
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await fetchCart();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const cart = await fetchCartById(req.params.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const cart = await updateCart(req.params.id, req.body);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const cart = await removeCart(req.params.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};
