import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeWishList: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newWishList = [...state.items];

      if (index >= 0) {
        newWishList.splice(index, 1);
      } else {
        console.warn(
          `cant remove product id: ${action.payload.id} is not in the wishlist`
        );
      }

      state.items = newWishList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishList, removeWishList } = wishListSlice.actions;

export const selectWishListItems = (state) => state.wishlist.items;
export const selectWishListItemsWsingId = (state, id) => {
  state.wishlist.items.filter((item) => item.id === id);
};
export const selectWishListTotal = (state) => {
  const total = state.wishlist.items.reduce(
    (total, item) => (total += item.item.price),
    0
  );

  return total;
};

export default wishListSlice.reducer;
