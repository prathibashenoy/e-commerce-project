// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// --------------------------------------
// LOAD CART FROM LOCAL STORAGE
// --------------------------------------
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

// --------------------------------------
// SAVE CART TO LOCAL STORAGE
// --------------------------------------
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

// --------------------------------------
// INITIAL STATE
// --------------------------------------
const initialState = {
  items: loadCartFromStorage(),
};

// --------------------------------------
// CART SLICE
// --------------------------------------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ADD PRODUCT
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      saveCartToStorage(state.items);
    },

    // INCREASE QUANTITY
    increaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      );

      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },

    // DECREASE QUANTITY
    decreaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state.items);
      }
    },

    // REMOVE ITEM
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );

      saveCartToStorage(state.items);
    },

    // CLEAR CART
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// --------------------------------------
// EXPORT ACTIONS & REDUCER
// --------------------------------------
export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
