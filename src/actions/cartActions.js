import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleOpen, handleClose };
};

export const handleAddToCart = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItem = cartItems.find((cart) => cart.id === product.id);
  if (existingItem) {
    existingItem.amount++;
  } else {
    cartItems.push({ ...product, amount: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const addOne = (updateLocalStorage, setCartItems, itemId) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = cartItems.find((cart) => cart.id === Number(itemId));
  if (item) {
    ++item.amount;
  }
  updateLocalStorage(cartItems);
  setCartItems(cartItems);
};

export const removeOne = (updateLocalStorage, setCartItems, itemId) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = cartItems.find((cart) => cart.id === Number(itemId));
  if (item) {
    if (item.amount > 1) {
      --item.amount;
      updateLocalStorage(cartItems);
      setCartItems(cartItems);
    } else if (item.amount === 1) {
      let filterCart = cartItems.filter((cart) => cart.id !== Number(itemId));
      updateLocalStorage(filterCart);
      setCartItems(filterCart);
    }
  }
};
