import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import wishListReducer from "./features/wishListSlice";
import notificationReducer from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    wishlist: wishListReducer,
    notification: notificationReducer,
  },
});
