import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    clearCart: (state, action) => {
      state.items = [];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant remove product id: ${action.payload.id} is not in the basket`
        );
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearCart } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWsingId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => {
  const total = state.basket.items.reduce(
    (total, item) => (total += item.item.price),
    0
  );
  return total;
};

export default basketSlice.reducer;
